from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import unquote
from datetime import date
import json,re,math,zipfile
D=Path(__file__).resolve().parent.parent;B=D/'Agent开发蓝图'
# Deliberately bounded validator for the JSON Schema constructs used by these samples.
# This is sample checking, not a replacement for a full schema engine in production.
def valid(s,v):
 if 'enum' in s and v not in s['enum']:return False
 if 'const' in s and v!=s['const']:return False
 if 'type' in s:
  types=s['type'] if isinstance(s['type'],list) else [s['type']]
  kind='null' if v is None else 'boolean' if isinstance(v,bool) else 'integer' if isinstance(v,int) else 'number' if isinstance(v,float) else 'string' if isinstance(v,str) else 'array' if isinstance(v,list) else 'object'
  if kind not in types and not(kind=='integer' and 'number' in types):return False
 if isinstance(v,dict):
  if any(k not in v for k in s.get('required',[])):return False
  props=s.get('properties',{})
  if s.get('additionalProperties') is False and any(k not in props for k in v):return False
  if any(not valid(props[k],val) for k,val in v.items() if k in props):return False
  extra=s.get('additionalProperties')
  if isinstance(extra,dict) and any(not valid(extra,val) for k,val in v.items() if k not in props):return False
 if isinstance(v,list):
  if len(v)>s.get('maxItems',10**9):return False
  if 'items' in s and any(not valid(s['items'],a) for a in v):return False
 if isinstance(v,str):
  if len(v)<s.get('minLength',0) or len(v)>s.get('maxLength',10**9):return False
  if s.get('format')=='date':
   try:date.fromisoformat(v)
   except ValueError:return False
 if isinstance(v,(int,float)) and not isinstance(v,bool):
  if v<s.get('minimum',-math.inf) or v>s.get('maximum',math.inf) or v<=s.get('exclusiveMinimum',-math.inf):return False
 if 'anyOf' in s and not any(valid(x,v) for x in s['anyOf']):return False
 if 'allOf' in s and not all(valid(x,v) for x in s['allOf']):return False
 if 'if' in s and not valid(s.get('then',{}) if valid(s['if'],v) else s.get('else',{}),v):return False
 return True
parsed={p.name:json.loads(p.read_text()) for p in B.glob('*.json')}
tools=parsed['工具契约.json']['tools'];assert len(tools)==12
inputs=parsed['工具调用示例.json']['inputs']
for t in tools:
 s=t['input_schema'];v=inputs[t['id']];assert valid(s,v),t['id']
 for forbidden in ['principal_id','tenant_id','scope_ref','arbitrary_sql','arbitrary_url']:
  assert not valid(s,{**v,forbidden:'forged'}),(t['id'],forbidden)
assert not valid(tools[1]['input_schema'],{'contract_id':['HT-A01','HT-A02'],'as_of':'2026-11-08'})
assert not valid(tools[1]['input_schema'],{'contract_id':'HT-A01','as_of':'2026-02-30'})
assert not valid(tools[5]['input_schema'],{**inputs['T06'],'allowed_drill_path':'ANY_URL'})
card=parsed['结果卡.schema.json']
for n in ['结果卡示例_单合同.json','结果卡示例_企业.json']:assert valid(card,parsed[n]),n
base=parsed['结果卡示例_企业.json'];zero=json.loads(json.dumps(base));zero['dimensions'][0].update(num=0,value=0);assert valid(card,zero)
partial=json.loads(json.dumps(base));partial['dimensions'][0].update(status='PARTIAL',value=None);assert valid(card,partial)
partial['dimensions'][0]['value']=0;assert not valid(card,partial),'partial must not produce zero ratio'
none=json.loads(json.dumps(base));none['dimensions'][0].update(status='NOT_APPLICABLE',num=0,den=0,value=None);assert valid(card,none)
f=json.loads((D/'场景与演示数据.json').read_text())['fixture'];a=[r for r in f['contracts'] if r['enterprise']=='A'];a_proj=[r for r in a if r['project']=='项目A'];c=[r for r in f['contracts'] if r['enterprise']=='C']
assert sum(r['cash'] for r in a)/sum(r['receivable'] for r in a)==.85
assert sum(r['axes'][1][0] for r in a)/sum(r['axes'][1][1] for r in a)==.775
assert math.isclose(sum(r['cash'] for r in a_proj)/sum(r['receivable'] for r in a_proj),160000/180000)
assert all(r['axes'][2] is None for r in c)
assert sum(r['axes'][4][0] for r in c)==0 and sum(r['axes'][4][1] for r in c)>0
assert (date(2026,11,8)-date(2026,10,31)).days==8
cases=parsed['联调验收样本.json'];assert len(cases['cases'])==20;assert cases['execution_status'].startswith('NOT_EXECUTED')
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[];self.views=[];self.panels=[]
 def handle_starttag(self,t,a):
  x=dict(a)
  if x.get('id'):self.ids.append(x['id'])
  if t=='a' and x.get('href'):self.links.append(x['href'])
  if x.get('data-panel'):self.panels.append(x['data-panel'])
  if x.get('data-view'):self.views.append(x['data-view'])
for filename in ['客户演示.html','业务交互原型.html']:
 p=Page();text=(D/filename).read_text();p.feed(text)
 assert not [a for a,n in Counter(p.ids).items() if n>1],filename
 assert len(p.panels)==11 and len(set(p.panels))==11
 assert 'agentdesign' in p.views and 'agentdesign' in p.panels
 for href in p.links:
  if href.startswith('#'):assert href[1:] in p.ids,(filename,href)
  elif '://' not in href and not href.startswith(('mailto:','javascript:')):assert (D/unquote(href.split('#')[0])).exists(),(filename,href)
 assert '12项工具输入Schema' in text or '12项输入Schema' in text
print(json.dumps({'json_files_parsed':len(parsed),'tool_sample_inputs':12,'identity_argument_injection_rejections':60,'result_cards':2,'zero_partial_na_examples':'PASS','fixture_arithmetic':'PASS','engineering_cases':20,'page_navigation_and_links':'PASS','limitations':'bounded schema sample checker; no customer API or LLM execution'},ensure_ascii=False))
