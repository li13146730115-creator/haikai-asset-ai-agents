"""Executable P0 business reference. Demo adapter, not production auth/LLM/storage."""
import copy
import hashlib
import json
import threading
import uuid
from datetime import date, datetime, timezone, timedelta
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

class ApiError(Exception):
    def __init__(self,code,message='请求无法执行',http_status=422):
        super().__init__(message);self.code=code;self.message=message;self.http_status=http_status

def reject(code,message='请求无法执行',status=422):raise ApiError(code,message,status)
def uid(prefix):return prefix+'-'+uuid.uuid4().hex[:16]
def digest(value):return hashlib.sha256(json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()[:24]
def strict(data,allowed,required=()):
    if not isinstance(data,dict) or set(data)-set(allowed) or any(k not in data for k in required):reject('INVALID_REQUEST','缺少必填字段或存在未定义字段')
def parse_date(value):
    if not isinstance(value,str):reject('INVALID_REQUEST','日期须为YYYY-MM-DD')
    try:
        d=date.fromisoformat(value)
        if str(d)!=value:raise ValueError()
        return d
    except ValueError:reject('INVALID_REQUEST','日期须为有效YYYY-MM-DD')
def string(value):
    if not isinstance(value,str) or not value.strip() or len(value)>200:reject('INVALID_REQUEST','标识/字符串不合法')
    return value

def string_array(value):
    if not isinstance(value,list) or len(value)>100:reject('INVALID_REQUEST','数组最多100项')
    return [string(x) for x in value]

class DemoAdapter:
    """Replace with an authorized, transactionally consistent source snapshot adapter."""
    def __init__(self):
        self.data=json.loads(Path(__file__).with_name('fixture.json').read_text())
        self.users={
            'demo-manager':{'principal_id':'manager','tenant_id':'DEMO','role':'MANAGER','projects':['项目A','项目B']},
            'demo-clerk-a':{'principal_id':'clerk-a','tenant_id':'DEMO','role':'CLERK','projects':['项目A']},
            'demo-finance':{'principal_id':'finance','tenant_id':'DEMO','role':'FINANCE','projects':['项目A','项目B']}}
    def revision(self):return digest(self.data)
    def allocate_demo_receipt(self):
        """Test/adapter hook only. Not registered as an HTTP or model tool."""
        if any(a['id']=='ALLOC-A01-PENDING' for a in self.data['allocations']):return
        self.data['allocations'].append({'id':'ALLOC-A01-PENDING','bill_id':'DEMO-B-A01-03','amount_fen':500000,'kind':'CASH','actual_paid_at':'2026-11-07','effective_at':'2026-11-07','status':'POSTED','reverse_of':None})
        self.data['receipts'][0]['unallocated_fen']=0

class Service:
    ROLES={'SIGNATORY','JOINT_SIGNATORY','PAYER','USER','GUARANTOR'}
    QUERY_FIELDS={'as_of','enterprise_ids','filters','responsibility','role_scope','page','page_size'}
    def __init__(self,adapter=None):
        self.adapter=adapter or DemoAdapter();self.analyses={};self.drafts={};self.idempotency={};self.lock=threading.RLock()
    def context(self,token):
        if token not in self.adapter.users:reject('AUTH_REQUIRED','需要有效登录态',401)
        c=copy.deepcopy(self.adapter.users[token]);c['_demo_token']=token;return c
    def _trusted(self,ctx):return self.context(ctx.get('_demo_token'))
    def _scope_hash(self,ctx):return digest({k:v for k,v in ctx.items() if not k.startswith('_')})
    def _all_visible(self,ctx):return [r for r in self.adapter.data['contracts'] if r['project_id'] in ctx['projects']]
    def _get_contract(self,ctx,id):
        rows=[r for r in self._all_visible(ctx) if r['id']==id]
        if not rows:reject('NOT_ACCESSIBLE','当前无法访问该对象',404)
        return rows[0]
    def _query(self,body,extra=()):
        strict(body,self.QUERY_FIELDS|set(extra),['as_of']);parse_date(body['as_of'])
        if 'enterprise_ids' in body:string_array(body['enterprise_ids'])
        filters=body.get('filters',{});strict(filters,{'project_ids','fee_codes'})
        for key in filters:string_array(filters[key])
        if body.get('responsibility','ALL_VISIBLE') not in ['SELF','ALL_VISIBLE']:reject('INVALID_REQUEST','responsibility仅支持SELF/ALL_VISIBLE')
        roles=body.get('role_scope',['SIGNATORY']);string_array(roles)
        if not roles or set(roles)-self.ROLES:reject('INVALID_REQUEST','非法主体角色')
        for key,limit in [('page',1000000),('page_size',100)]:
            v=body.get(key,1 if key=='page' else 20)
            if isinstance(v,bool) or not isinstance(v,int) or not 1<=v<=limit:reject('INVALID_REQUEST','分页范围不合法')
        return copy.deepcopy(body)
    def _select(self,ctx,q):
        rows=self._all_visible(ctx);filters=q.get('filters',{})
        if 'project_ids' in filters:rows=[r for r in rows if r['project_id'] in filters['project_ids']]
        if q.get('responsibility')=='SELF':rows=[r for r in rows if r['responsible_id']==ctx['principal_id']]
        ids=set(q['enterprise_ids']) if 'enterprise_ids' in q else None
        roles=q.get('role_scope',['SIGNATORY'])
        eligible={r['contract_id'] for r in self.adapter.data['parties'] if r['verified'] and r['role'] in roles and (ids is None or r['enterprise_id'] in ids)}
        rows=[r for r in rows if r['id'] in eligible]
        return sorted(rows,key=lambda r:r['id'])
    def resolve(self,ctx,body):
        ctx=self._trusted(ctx);strict(body,{'object_type','keyword'},['object_type','keyword']);keyword=string(body['keyword']).lower()
        if body['object_type']=='CONTRACT':rows=[{'id':r['id'],'label':r['name']} for r in self._all_visible(ctx) if keyword in (r['id']+r['name']).lower()]
        elif body['object_type']=='ENTERPRISE':
            visible={r['id'] for r in self._all_visible(ctx)};ids={p['enterprise_id'] for p in self.adapter.data['parties'] if p['verified'] and p['contract_id'] in visible}
            rows=[{'id':r['id'],'label':r['name']} for r in self.adapter.data['enterprises'] if r['id'] in ids and keyword in (r['id']+r['name']).lower()]
        else:reject('INVALID_REQUEST','仅支持CONTRACT/ENTERPRISE')
        return {'status':'NEEDS_CLARIFICATION' if len(rows)>1 else 'RESOLVED' if rows else 'NO_MATCH','candidates':rows[:50]}
    def _bill_facts(self,contract,as_of,fee_codes=None):
        as_date=parse_date(as_of);rows=[]
        bills=sorted(self.adapter.data['bills'],key=lambda b:b['id'])
        for b in bills:
            if b['contract_id']!=contract['id'] or b['status']!='EFFECTIVE' or not b['is_leaf'] or b['effective_at']>as_of:continue
            if fee_codes is not None and b['fee_code'] not in fee_codes:continue
            alloc=[a for a in self.adapter.data['allocations'] if a['bill_id']==b['id'] and a['status']=='POSTED' and a['effective_at']<=as_of]
            cash=sum(a['amount_fen'] for a in alloc if a['kind']=='CASH');noncash=sum(a['amount_fen'] for a in alloc if a['kind']=='NONCASH')
            if cash<0 or noncash<0 or cash+noncash>b['receivable_fen']:reject('SOURCE_INCONSISTENT','账单分配与有效应收不一致',503)
            balance=b['receivable_fen']-cash-noncash;days=max((as_date-parse_date(b['effective_due_date'])).days,0)
            timely=max(0,min(b['receivable_fen'],sum(a['amount_fen'] for a in alloc if a['kind']=='CASH' and a['actual_paid_at']<=b['effective_due_date'])))
            rows.append({**b,'cash_allocated_fen':cash,'noncash_settled_fen':noncash,'unsettled_fen':balance,'overdue_fen':balance if days>0 else 0,'overdue_days':days if balance>0 else 0,'timely_paid_fen':timely,'allocation_ids':[a['id'] for a in alloc],'allocations':copy.deepcopy(alloc),'source_ref':b['id']})
        return rows
    def _financial(self,bills):
        return {k:sum(b[k] for b in bills) for k in ['receivable_fen','cash_allocated_fen','noncash_settled_fen','unsettled_fen','overdue_fen']}
    def _facts(self,contract,q):
        bills=self._bill_facts(contract,q['as_of'],q.get('filters',{}).get('fee_codes'))
        pending=[r for r in self.adapter.data['receipts'] if r['contract_id']==contract['id'] and r['verified_contract_ref'] and r['unallocated_fen']>0 and r['actual_paid_at']<=q['as_of']]
        return {'contract':copy.deepcopy(contract),'bills':bills,'financial':self._financial(bills),'pending_receipts':copy.deepcopy(pending)}
    def _rules(self,facts):
        overdue=facts['financial']['overdue_fen'];pending=facts['pending_receipts']
        return [{'rule_id':'R-C01','status':'MATCHED' if overdue>0 else 'NOT_MATCHED','severity':'MEDIUM' if overdue else 'INFO','observed_fen':overdue,'evidence_refs':[b['id'] for b in facts['bills'] if b['overdue_fen']>0]},
                {'rule_id':'R-C02','status':'PENDING_REVIEW' if pending else 'NOT_MATCHED','severity':'INFO','observed_fen':sum(r['unallocated_fen'] for r in pending),'evidence_refs':[r['id'] for r in pending]}]
    def _ratio(self,id,known,num,den,unit,count,total):
        status='UNAVAILABLE' if count==0 and total else 'PARTIAL' if count<total else 'NOT_APPLICABLE' if den==0 else 'COMPLETE'
        value=int((Decimal(num)*10000/Decimal(den)).quantize(Decimal('1'),rounding=ROUND_HALF_UP)) if status=='COMPLETE' else None
        return {'id':id,'status':status,'numerator':num if count else None,'denominator':den if count else None,'num_unit':unit,'den_unit':unit,'value_bps':value,'value_unit':'BASIS_POINT','known_contract_count':count,'eligible_contract_count':total,'source_refs':known}
    def _dimensions(self,contracts,q):
        out=[];as_date=parse_date(q['as_of'])
        for idx in range(1,7):
            num=den=count=0;refs=[]
            for r in contracts:
                facts=self._facts(r,q);bills=facts['bills'];known=True;n=d=0;source=[]
                if idx==1:n=facts['financial']['cash_allocated_fen'];d=facts['financial']['receivable_fen'];source=[b['id'] for b in bills]
                elif idx==2:
                    known=r['timeliness_complete'];due=[b for b in bills if b['effective_due_date']<=q['as_of']];n=sum(b['timely_paid_fen'] for b in due);d=sum(b['receivable_fen'] for b in due);source=[b['id'] for b in due]
                elif idx==3:
                    known=r['guarantee_complete'];gs=[g for g in self.adapter.data['guarantees'] if g['contract_id']==r['id'] and g['verified']];required=sum(g['required_fen'] for g in gs);held=sum(g['valid_held_fen'] for g in gs);n=min(held,required);d=required;source=[g['id'] for g in gs]
                else:
                    key={4:'obligations',5:'preparation_items',6:'evidence_items'}[idx]
                    items=[x for x in self.adapter.data[key] if x['contract_id']==r['id'] and x['required'] and x['review_status']=='PUBLISHED']
                    if idx==4:items=[x for x in items if x['due_date']<=q['as_of']]
                    if idx==5:items=[x for x in items if as_date<parse_date(x['due_date'])<=as_date+timedelta(days=90)]
                    n=sum(x['completed'] and x['verified'] for x in items);d=len(items);source=[x['id'] for x in items]
                if known:num+=n;den+=d;count+=1;refs+=source
            out.append(self._ratio('R'+str(idx),refs,num,den,'CNY_FEN' if idx<=3 else 'ITEM',count,len(contracts)))
        return out
    def _row(self,r,q):
        facts=self._facts(r,q);return {'contract_id':r['id'],'contract_number':r['number'],'project_id':r['project_id'],'responsible_id':r['responsible_id'],**facts['financial'],'rules':self._rules(facts),'handoff':{'agent_id':'A1','contract_id':r['id'],'as_of':q['as_of']}}
    def _store(self,ctx,q,data,kind,contracts):
        id=uid('AN');revision=self.adapter.revision();envelope={'schema_version':'p0-v1','analysis_id':id,'request_id':uid('REQ'),'kind':kind,'as_of':q['as_of'],'source_revision':revision,'snapshot_id':uid('SNAP'),'captured_at':datetime.now(timezone.utc).isoformat(),'rule_version':'R-C01-C02-v1','metric_version':'R1-R6-v1','scope':{'scope_fingerprint':self._scope_hash(ctx),'effective_project_ids':sorted(set(r['project_id'] for r in contracts)),'responsibility':q.get('responsibility','ALL_VISIBLE'),'role_scope':q.get('role_scope',['SIGNATORY'])},'query_context':copy.deepcopy(q),'data':data}
        self.analyses[id]={'principal_id':ctx['principal_id'],'scope_hash':self._scope_hash(ctx),'contract_ids':[r['id'] for r in contracts],'query':copy.deepcopy(q),'result':copy.deepcopy(envelope)}
        return envelope
    def contract(self,ctx,body):
        ctx=self._trusted(ctx);strict(body,{'contract_id','as_of'},['contract_id','as_of']);string(body['contract_id']);parse_date(body['as_of']);r=self._get_contract(ctx,body['contract_id']);facts=self._facts(r,body)
        return self._store(ctx,body,{**facts,'rules':self._rules(facts),'allowed_actions':['OPEN_SOURCE','RECHECK']+(['SAVE_DRAFT'] if ctx['role'] in ['CLERK','FINANCE'] else [])},'CONTRACT',[r])
    def enterprise(self,ctx,body):
        ctx=self._trusted(ctx);q=self._query(body);rows=self._select(ctx,q);roles=q.get('role_scope',['SIGNATORY']);rowids={r['id'] for r in rows}
        parties=[p for p in self.adapter.data['parties'] if p['verified'] and p['contract_id'] in rowids and p['role'] in roles]
        ids=sorted({p['enterprise_id'] for p in parties})
        if 'enterprise_ids' in q:ids=[i for i in ids if i in q['enterprise_ids']]
        enterprises=[];membership=[]
        for id in ids:
            cids={p['contract_id'] for p in parties if p['enterprise_id']==id};cr=[r for r in rows if r['id'] in cids];membership+=list(cids)
            name=next(e['name'] for e in self.adapter.data['enterprises'] if e['id']==id)
            enterprises.append({'enterprise_id':id,'name':name,'contract_count':len(cr),'dimensions':self._dimensions(cr,q),'financial':self._financial([b for r in cr for b in self._facts(r,q)['bills']])})
        # Overall totals always come from the unique contract set, never summed enterprise rows.
        allrows=[self._row(r,q) for r in rows];page=q.get('page',1);size=q.get('page_size',20)
        data={'financial':self._financial([b for r in rows for b in self._facts(r,q)['bills']]),'contract_count':len(rows),'enterprises':enterprises,'enterprise_totals_nonadditive':len(membership)>len(set(membership)),'contracts':allrows[(page-1)*size:page*size],'page':{'number':page,'size':size,'total':len(rows),'has_more':page*size<len(rows),'statistics_scope':'ALL_MATCHED'}}
        return self._store(ctx,q,data,'ENTERPRISE',rows)
    def collection(self,ctx,body):
        ctx=self._trusted(ctx);q=self._query(body,{'list_type'})
        if q.get('list_type') not in ['RISK','UNSETTLED']:reject('INVALID_REQUEST','list_type为RISK或UNSETTLED')
        rows=self._select(ctx,q);result=[self._row(r,q) for r in rows]
        result=[r for r in result if r['unsettled_fen']>0] if q['list_type']=='UNSETTLED' else [r for r in result if any(x['status'] in ['MATCHED','PENDING_REVIEW'] for x in r['rules'])]
        ids={r['contract_id'] for r in result};selected=[r for r in rows if r['id'] in ids];p=q.get('page',1);size=q.get('page_size',20)
        data={'contracts':result[(p-1)*size:p*size],'financial':self._financial([b for r in selected for b in self._facts(r,q)['bills']]),'contract_count':len(selected),'page':{'number':p,'size':size,'total':len(result),'has_more':p*size<len(result),'statistics_scope':'ALL_MATCHED'},'enabled_rules':['R-C01','R-C02']}
        return self._store(ctx,q,data,'COLLECTION',selected)
    def _saved(self,ctx,id):
        ctx=self._trusted(ctx);string(id);saved=self.analyses.get(id)
        if not saved or saved['principal_id']!=ctx['principal_id']:reject('NOT_ACCESSIBLE','当前无法访问该对象',404)
        visible={r['id'] for r in self._all_visible(ctx)}
        if saved['scope_hash']!=self._scope_hash(ctx) or not set(saved['contract_ids'])<=visible:reject('SCOPE_CHANGED','权限已变化，请重新查询',409)
        if saved['query'].get('responsibility')=='SELF':
            own={r['id'] for r in self._select(ctx,saved['query'])}
            if not set(saved['contract_ids'])<=own:reject('SCOPE_CHANGED','责任范围已变化，请重新查询',409)
        return saved
    def get_analysis(self,ctx,id):return copy.deepcopy(self._saved(ctx,id)['result'])
    def detail(self,ctx,id,body):
        strict(body,{'dimension_id','contract_id'},['dimension_id']);dim=body['dimension_id']
        if dim not in ['R1','R2','R3','R4','R5','R6']:reject('INVALID_REQUEST','非法维度')
        saved=self._saved(ctx,id)
        # A snapshot has to be used for details; facts changing requires a new analysis.
        if saved['result']['source_revision']!=self.adapter.revision():reject('STALE_SNAPSHOT','事实已变化，请重新核验后下钻',409)
        ids=saved['contract_ids']
        if 'contract_id' in body:
            string(body['contract_id'])
            if body['contract_id'] not in ids:reject('NOT_ACCESSIBLE','当前无法访问该对象',404)
            ids=[body['contract_id']]
        result=[];q=saved['query'];ctx=self._trusted(ctx)
        for cid in ids:
            r=self._get_contract(ctx,cid);axis=self._dimensions([r],q)[int(dim[1])-1]
            source_type='BILL' if dim in ['R1','R2'] else 'GUARANTEE' if dim=='R3' else 'OBLIGATION' if dim=='R4' else 'PREPARATION_ITEM' if dim=='R5' else 'EVIDENCE'
            result.append({'contract_id':cid,**axis,'evidence':[{'source_id':v,'source_type':source_type} for v in axis['source_refs']],'handoff':{'agent_id':'A1','contract_id':cid,'as_of':q['as_of']}})
        return {'analysis_id':id,'dimension_id':dim,'snapshot_id':saved['result']['snapshot_id'],'data':{'rows':result}}
    def recheck(self,ctx,id):
        saved=self._saved(ctx,id);q=saved['query'];kind=saved['result']['kind']
        new={'CONTRACT':self.contract,'ENTERPRISE':self.enterprise,'COLLECTION':self.collection}[kind](ctx,q)
        new['previous_analysis_id']=id
        new['changes']={'previous_source_revision':saved['result']['source_revision'],'current_source_revision':new['source_revision'],'source_changed':saved['result']['source_revision']!=new['source_revision']}
        self.analyses[new['analysis_id']]['result']=copy.deepcopy(new);return new
    def create_draft(self,ctx,body):
        ctx=self._trusted(ctx);strict(body,{'analysis_id','action_type','note'},['analysis_id','action_type'])
        if ctx['role'] not in ['CLERK','FINANCE']:reject('ACTION_FORBIDDEN','当前角色不可登记核查',403)
        if body['action_type']!='PAYMENT_REVIEW':reject('INVALID_REQUEST','首期仅支持PAYMENT_REVIEW')
        if not isinstance(body.get('note',''),str) or len(body.get('note',''))>2000:reject('INVALID_REQUEST','note最多2000字')
        saved=self._saved(ctx,body['analysis_id'])
        if saved['result']['kind']!='CONTRACT':reject('INVALID_REQUEST','草稿绑定单合同分析')
        if saved['result']['source_revision']!=self.adapter.revision():reject('REVISION_CONFLICT','事实已变化，请重新核验',409)
        id=uid('DRAFT');record={'draft_id':id,'analysis_id':body['analysis_id'],'contract_id':saved['query']['contract_id'],'action_type':body['action_type'],'note':body.get('note',''),'state':'DRAFT','source_revision':self.adapter.revision(),'created_at':datetime.now(timezone.utc).isoformat(),'expires_at':(datetime.now(timezone.utc)+timedelta(minutes=30)).isoformat(),'principal_id':ctx['principal_id']}
        self.drafts[id]=record;return copy.deepcopy(record)
    def confirm_draft(self,ctx,id,body,key):
        ctx=self._trusted(ctx);strict(body,{'expected_revision'},['expected_revision']);string(body['expected_revision']);string(key)
        with self.lock:
            string(id);d=self.drafts.get(id)
            if not d or d['principal_id']!=ctx['principal_id']:reject('NOT_ACCESSIBLE','当前无法访问该对象',404)
            if ctx['role'] not in ['CLERK','FINANCE']:reject('ACTION_FORBIDDEN','当前角色不可登记核查',403)
            self._saved(ctx,d['analysis_id']);k=(ctx['principal_id'],key);fingerprint=digest({'draft_id':id,'body':body})
            if k in self.idempotency:
                prev=self.idempotency[k]
                if prev['fingerprint']!=fingerprint:reject('IDEMPOTENCY_CONFLICT','幂等键已用于其他请求',409)
                return copy.deepcopy(prev['response'])
            if d['state']=='SUBMITTED':reject('ALREADY_SUBMITTED','该草稿已提交',409)
            if datetime.fromisoformat(d['expires_at'])<=datetime.now(timezone.utc):reject('DRAFT_EXPIRED','草稿已过期，请重新核验',409)
            if body['expected_revision']!=d['source_revision'] or self.adapter.revision()!=d['source_revision']:reject('REVISION_CONFLICT','事实已变化，请重新核验',409)
            response={'draft_id':id,'state':'SUBMITTED','work_item_id':uid('MOCK-WORK'),'business_risk_state':'OPEN','financial_write_performed':False,'simulation':True}
            d['state']='SUBMITTED';self.idempotency[k]={'fingerprint':fingerprint,'response':response};return copy.deepcopy(response)
    def agent_run(self,ctx,body):
        strict(body,{'intent','query'},['intent','query']);strict(body['intent'],{'object_level','task'},['object_level','task'])
        intent=body['intent'];level=intent['object_level'];task=intent['task']
        if task not in ['RISK','OVERVIEW','UNSETTLED','DIMENSIONS']:reject('INVALID_REQUEST','首期任务不支持')
        if level=='CONTRACT':agent='A1';result=self.contract(ctx,body['query']);nodes=['CONTEXT','RESOLVE_SELECTED_CONTRACT','FACTS','RULES','TEMPLATE_RENDER']
        elif level in ['ENTERPRISE','COLLECTION']:
            agent='A2'
            if level=='COLLECTION':
                if task not in ['RISK','UNSETTLED']:reject('INVALID_REQUEST','集合首期仅支持风险或欠费清单')
                q=copy.deepcopy(body['query']);q['list_type']=task;result=self.collection(ctx,q)
            else:result=self.enterprise(ctx,body['query'])
            nodes=['CONTEXT','FREEZE_SCOPE','COLLECTION_QUERY','DIMENSIONS' if level=='ENTERPRISE' else 'LIST','TEMPLATE_RENDER']
        else:reject('INVALID_REQUEST','object_level须为CONTRACT/ENTERPRISE/COLLECTION')
        return {'agent_id':agent,'execution_mode':'STRUCTURED_INTENT_REFERENCE','llm_called':False,'trace':[{'node':n,'status':'SUCCEEDED','analysis_id':result['analysis_id']} for n in nodes],'result':result}
