"""OpenAPI reference consistency checker for schema constructs used in this package.
Not a general JSON Schema engine; production should use its framework's full validator.
"""
import json
import unittest
from pathlib import Path
from datetime import date
from service import Service
ROOT=Path(__file__).resolve().parent.parent
DOC=json.loads((ROOT/'openapi.json').read_text())

def validate(s,v):
    if '$ref' in s:
        target=DOC
        for key in s['$ref'][2:].split('/'):target=target[key]
        return validate(target,v)
    if 'oneOf' in s:return sum(validate(a,v) for a in s['oneOf'])==1
    if 'enum' in s and v not in s['enum']:return False
    if 'type' in s:
        t=s['type'] if isinstance(s['type'],list) else [s['type']]
        vt='null' if v is None else 'boolean' if isinstance(v,bool) else 'integer' if isinstance(v,int) else 'number' if isinstance(v,float) else 'string' if isinstance(v,str) else 'array' if isinstance(v,list) else 'object'
        if vt not in t and not(vt=='integer' and 'number' in t):return False
    if isinstance(v,dict):
        props=s.get('properties',{})
        if any(k not in v for k in s.get('required',[])):return False
        if s.get('additionalProperties') is False and set(v)-set(props):return False
        if any(not validate(props[k],val) for k,val in v.items() if k in props):return False
    if isinstance(v,list):
        if len(v)>s.get('maxItems',10**9) or len(v)<s.get('minItems',0):return False
        if 'items' in s and any(not validate(s['items'],x) for x in v):return False
    if isinstance(v,str):
        if len(v)>s.get('maxLength',10**9) or len(v)<s.get('minLength',0):return False
        if s.get('format')=='date':
            try:date.fromisoformat(v)
            except ValueError:return False
    if isinstance(v,(int,float)) and not isinstance(v,bool):
        if v<s.get('minimum',float('-inf')) or v>s.get('maximum',float('inf')):return False
    return True

class ContractTests(unittest.TestCase):
    def test_all_refs_resolve(self):
        def walk(x):
            if isinstance(x,dict):
                if '$ref' in x:
                    node=DOC
                    for k in x['$ref'][2:].split('/'):node=node[k]
                for v in x.values():walk(v)
            elif isinstance(x,list):
                for v in x:walk(v)
        walk(DOC)
    def test_every_inline_request_and_response_example_matches_schema(self):
        n=0
        for path,item in DOC['paths'].items():
            for method,op in item.items():
                for entry in [op.get('requestBody',{}),*op['responses'].values()]:
                    for c in entry.get('content',{}).values():
                        if 'example' in c:self.assertTrue(validate(c['schema'],c['example']),path+' '+method);n+=1
        self.assertGreaterEqual(n,15)
    def test_all_business_operations_match_implemented_examples(self):
        self.assertEqual(sum(len(p) for p in DOC['paths'].values()),11)
        s=Service();m=s.context('demo-manager');c=s.context('demo-clerk-a')
        req={'contract_id':'HT-A01','as_of':'2026-11-08'};a=s.contract(c,req)
        pairs=[('ContractAnalysis',a),('EnterpriseAnalysis',s.enterprise(m,{'enterprise_ids':['C'],'as_of':'2026-11-08'})),('CollectionAnalysis',s.collection(c,{'as_of':'2026-11-08','list_type':'UNSETTLED','responsibility':'SELF'})),('RecheckAnalysis',s.recheck(c,a['analysis_id']))]
        for schema,value in pairs:self.assertTrue(validate(DOC['components']['schemas'][schema],value),schema)
    def test_zero_and_partial_keep_contract(self):
        s=Service();a=s.enterprise(s.context('demo-manager'),{'as_of':'2026-11-08','enterprise_ids':['C']});dims=a['data']['enterprises'][0]['dimensions']
        self.assertIsNone(dims[1]['value_bps']);self.assertEqual(dims[4]['value_bps'],0);self.assertTrue(validate(DOC['components']['schemas']['EnterpriseAnalysis'],a))
if __name__=='__main__':unittest.main()
