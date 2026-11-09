import unittest
from service import Service, ApiError

class BusinessTests(unittest.TestCase):
    def setUp(self):
        self.s=Service();self.m=self.s.context('demo-manager');self.c=self.s.context('demo-clerk-a');self.f=self.s.context('demo-finance')
    def error(self,code,call):
        with self.assertRaises(ApiError) as e:call()
        self.assertEqual(e.exception.code,code)
    def contract(self,ctx=None,**extra):return self.s.contract(ctx or self.m,{'contract_id':'HT-A01','as_of':'2026-11-08',**extra})
    def enterprise(self,ctx=None,**extra):return self.s.enterprise(ctx or self.m,{'enterprise_ids':['A'],'as_of':'2026-11-08',**extra})
    def test_contract_balance_overdue_pending(self):
        d=self.contract()['data'];self.assertEqual(d['financial']['receivable_fen'],10000000);self.assertEqual(d['financial']['cash_allocated_fen'],8000000)
        self.assertEqual(d['financial']['unsettled_fen'],2000000);self.assertEqual(d['financial']['overdue_fen'],2000000);self.assertEqual(d['bills'][-1]['overdue_days'],8)
        self.assertEqual(d['pending_receipts'][0]['unallocated_fen'],500000);self.assertEqual(d['rules'][0]['status'],'MATCHED')
    def test_due_day_not_overdue(self):
        d=self.contract(as_of='2026-10-31')['data'];self.assertEqual(d['financial']['overdue_fen'],0);self.assertEqual(d['bills'][-1]['overdue_days'],0)
    def test_unknown_forbidden_same_error(self):
        for id in ['HT-A03','NONEXISTENT']:self.error('NOT_ACCESSIBLE',lambda:self.s.contract(self.c,{'contract_id':id,'as_of':'2026-11-08'}))
    def test_identity_injection_and_unknown_fields_rejected(self):
        self.error('INVALID_REQUEST',lambda:self.contract(principal_id='admin'));self.error('INVALID_REQUEST',lambda:self.enterprise(project_ids=['任意项目']))
    def test_enterprise_numerator_denominator_aggregation(self):
        d=self.enterprise()['data'];axes={x['id']:x for x in d['enterprises'][0]['dimensions']};self.assertEqual(d['financial']['receivable_fen'],20000000)
        self.assertEqual(d['financial']['cash_allocated_fen'],17000000)
        for id,v in [('R1',8500),('R2',7750),('R3',6667),('R4',8000),('R5',3333),('R6',8000)]:self.assertEqual(axes[id]['value_bps'],v)
    def test_project_scope_recalculated_without_hidden_ids(self):
        a=self.enterprise(self.c);self.assertEqual(a['data']['financial']['receivable_fen'],18000000);self.assertEqual(a['data']['enterprises'][0]['dimensions'][0]['value_bps'],8889)
        self.assertNotIn('HT-A03',str(a));self.assertNotIn('hidden_count',str(a))
    def test_self_responsibility_intersection(self):
        a=self.s.collection(self.c,{'as_of':'2026-11-08','list_type':'UNSETTLED','responsibility':'SELF'});self.assertEqual([r['contract_id'] for r in a['data']['contracts']],['HT-A01'])
    def test_empty_scope_not_default_all(self):
        a=self.enterprise(self.c,filters={'project_ids':['项目B']});self.assertEqual(a['data']['financial']['receivable_fen'],0);self.assertEqual(a['data']['contracts'],[])
    def test_page_does_not_change_total(self):
        a=self.enterprise(page=1,page_size=1);b=self.enterprise(page=2,page_size=1);self.assertEqual(a['data']['financial'],b['data']['financial']);self.assertEqual(a['data']['page']['total'],3)
        self.assertNotEqual(a['data']['contracts'][0]['contract_id'],b['data']['contracts'][0]['contract_id'])
    def test_joint_party_dedup_and_nonadditive(self):
        self.s.adapter.data['parties'].append({'contract_id':'HT-A01','enterprise_id':'B','role':'JOINT_SIGNATORY','verified':True})
        a=self.enterprise(enterprise_ids=['A','B'],role_scope=['SIGNATORY','JOINT_SIGNATORY']);self.assertEqual(a['data']['financial']['receivable_fen'],40000000)
        self.assertEqual(a['data']['contract_count'],5);self.assertTrue(a['data']['enterprise_totals_nonadditive'])
    def test_partial_unavailable_na_zero(self):
        a=self.enterprise(enterprise_ids=['C']);d={x['id']:x for x in a['data']['enterprises'][0]['dimensions']}
        for id,status,v in [('R2','PARTIAL',None),('R3','UNAVAILABLE',None),('R5','COMPLETE',0)]:self.assertEqual((d[id]['status'],d[id]['value_bps']),(status,v))
        e=self.enterprise();r=self.s.detail(self.m,e['analysis_id'],{'dimension_id':'R5','contract_id':'HT-A02'});self.assertEqual(r['data']['rows'][0]['status'],'NOT_APPLICABLE')
    def test_drill_within_analysis_matches_contract(self):
        a=self.enterprise();r=self.s.detail(self.m,a['analysis_id'],{'dimension_id':'R1','contract_id':'HT-A01'})['data']['rows'][0]
        self.assertEqual((r['numerator'],r['denominator']),(8000000,10000000));self.assertEqual(r['handoff']['contract_id'],'HT-A01')
        self.error('NOT_ACCESSIBLE',lambda:self.s.detail(self.m,a['analysis_id'],{'dimension_id':'R1','contract_id':'HT-B01'}))
    def test_report_reauthorizes_and_bound_to_principal(self):
        a=self.enterprise();self.error('NOT_ACCESSIBLE',lambda:self.s.get_analysis(self.c,a['analysis_id']))
        self.s.adapter.users['demo-manager']['projects']=['项目A'];self.error('SCOPE_CHANGED',lambda:self.s.get_analysis(self.s.context('demo-manager'),a['analysis_id']))
    def test_result_copy_immutable(self):
        a=self.contract();a['data']['financial']['unsettled_fen']=0;self.assertEqual(self.s.get_analysis(self.m,a['analysis_id'])['data']['financial']['unsettled_fen'],2000000)
    def test_allocation_refresh_keeps_old_and_timeliness(self):
        old=self.enterprise();self.s.adapter.allocate_demo_receipt();new=self.s.recheck(self.m,old['analysis_id']);self.assertNotEqual(new['analysis_id'],old['analysis_id'])
        d=new['data']['enterprises'][0]['dimensions'];self.assertEqual((d[0]['value_bps'],d[1]['value_bps']),(8750,7750));self.assertEqual(self.s.get_analysis(self.m,old['analysis_id'])['data']['financial']['cash_allocated_fen'],17000000)
    def test_reversal_reopens_balance(self):
        self.s.adapter.data['allocations'].append({'id':'REV-01','bill_id':'DEMO-B-A01-02','amount_fen':-1000000,'kind':'CASH','actual_paid_at':'2026-09-05','effective_at':'2026-11-08','status':'POSTED','reverse_of':'ALLOC-A01-02'})
        self.assertEqual(self.contract()['data']['financial']['unsettled_fen'],3000000)
    def test_draft_idempotent_without_financial_write(self):
        a=self.contract(self.c);d=self.s.create_draft(self.c,{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW','note':'核对待分配到账'})
        x=self.s.confirm_draft(self.c,d['draft_id'],{'expected_revision':d['source_revision']},'key-01');y=self.s.confirm_draft(self.c,d['draft_id'],{'expected_revision':d['source_revision']},'key-01')
        self.assertEqual(x['work_item_id'],y['work_item_id']);self.assertEqual(x['business_risk_state'],'OPEN');self.assertEqual(self.contract(self.c)['data']['financial']['unsettled_fen'],2000000)
    def test_manager_no_draft(self):
        a=self.contract();self.error('ACTION_FORBIDDEN',lambda:self.s.create_draft(self.m,{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW'}))
    def test_stale_draft(self):
        a=self.contract(self.c);d=self.s.create_draft(self.c,{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW'});self.s.adapter.allocate_demo_receipt()
        self.error('REVISION_CONFLICT',lambda:self.s.confirm_draft(self.c,d['draft_id'],{'expected_revision':d['source_revision']},'key-02'))
    def test_key_reuse_different_draft(self):
        a=self.contract(self.c);d1=self.s.create_draft(self.c,{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW'});d2=self.s.create_draft(self.c,{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW'})
        self.s.confirm_draft(self.c,d1['draft_id'],{'expected_revision':d1['source_revision']},'same-key');self.error('IDEMPOTENCY_CONFLICT',lambda:self.s.confirm_draft(self.c,d2['draft_id'],{'expected_revision':d2['source_revision']},'same-key'))
    def test_structured_run_routing(self):
        a=self.s.agent_run(self.c,{'intent':{'object_level':'COLLECTION','task':'UNSETTLED'},'query':{'as_of':'2026-11-08','responsibility':'SELF'}})
        self.assertEqual(a['agent_id'],'A2');self.assertEqual(a['result']['data']['contracts'][0]['contract_id'],'HT-A01')
        b=self.s.agent_run(self.c,{'intent':{'object_level':'CONTRACT','task':'RISK'},'query':{'contract_id':'HT-A01','as_of':'2026-11-08'}});self.assertEqual(b['agent_id'],'A1');self.assertTrue(b['trace'])
    def test_resolve_visible_only(self):
        r=self.s.resolve(self.c,{'object_type':'CONTRACT','keyword':'HT-A0'});self.assertEqual([x['id'] for x in r['candidates']],['HT-A01','HT-A02'])
    def test_strict_date_filters_role_pagination(self):
        self.error('INVALID_REQUEST',lambda:self.contract(as_of='2026-02-30'));self.error('INVALID_REQUEST',lambda:self.enterprise(page_size=0))
        self.error('INVALID_REQUEST',lambda:self.enterprise(filters={'sql':'select *'}));self.error('INVALID_REQUEST',lambda:self.enterprise(role_scope=['ANY_ROLE']))

if __name__=='__main__':unittest.main()
