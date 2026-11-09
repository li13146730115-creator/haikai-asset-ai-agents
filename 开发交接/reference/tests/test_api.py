import json
import unittest
from server import Application

class ApiTests(unittest.TestCase):
    def setUp(self):self.app=Application()
    def request(self,method,path,body=None,token='demo-manager',**headers):
        if token:headers['Authorization']='Bearer '+token
        return self.app.handle(method,path,headers,body)
    def test_auth_required(self):
        status,data=self.request('GET','/v1/context',token=None);self.assertEqual(status,401);self.assertEqual(data['error']['code'],'AUTH_REQUIRED')
    def test_contract_analysis_transport(self):
        status,data=self.request('POST','/v1/analyses/contract',{'contract_id':'HT-A01','as_of':'2026-11-08'})
        self.assertEqual(status,201);self.assertEqual(data['data']['financial']['unsettled_fen'],2000000)
        status,old=self.request('GET','/v1/analyses/'+data['analysis_id']);self.assertEqual(status,200);self.assertEqual(old['analysis_id'],data['analysis_id'])
    def test_draft_confirm_transport_and_required_key(self):
        _,a=self.request('POST','/v1/analyses/contract',{'contract_id':'HT-A01','as_of':'2026-11-08'},token='demo-clerk-a')
        status,d=self.request('POST','/v1/review-drafts',{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW'},token='demo-clerk-a');self.assertEqual(status,201)
        body={'expected_revision':d['source_revision']};path='/v1/review-drafts/'+d['draft_id']+'/confirm'
        status,err=self.request('POST',path,body,token='demo-clerk-a');self.assertEqual(status,422)
        status,r=self.request('POST',path,body,token='demo-clerk-a',**{'Idempotency-Key':'HTTP-1'});self.assertEqual(status,200);self.assertFalse(r['financial_write_performed'])
    def test_details_and_recheck_routes(self):
        _,a=self.request('POST','/v1/analyses/enterprise',{'enterprise_ids':['A'],'as_of':'2026-11-08'})
        status,d=self.request('GET','/v1/analyses/'+a['analysis_id']+'/details?dimension_id=R1&contract_id=HT-A01');self.assertEqual(status,200);self.assertEqual(d['data']['rows'][0]['numerator'],8000000)
        status,r=self.request('POST','/v1/analyses/'+a['analysis_id']+'/recheck',{});self.assertEqual(status,201);self.assertNotEqual(r['analysis_id'],a['analysis_id'])
    def test_no_posting_endpoint(self):
        status,_=self.request('POST','/v1/financial/allocate',{});self.assertEqual(status,404)
    def test_duplicate_query_and_get_query_rejected(self):
        status,_=self.request('GET','/v1/context?principal_id=manager');self.assertEqual(status,422)
        status,_=self.request('GET','/v1/analyses/ANY/details?dimension_id=R1&dimension_id=R2');self.assertEqual(status,422)
    def test_openapi_local_endpoint(self):
        status,doc=self.request('GET','/openapi.json',token=None);self.assertEqual(status,200);self.assertIn('/v1/agent-runs',doc['paths'])
    def test_unknown_json_body_not_object(self):
        status,d=self.request('POST','/v1/analyses/contract',['bad']);self.assertEqual(status,422);self.assertEqual(d['error']['code'],'INVALID_REQUEST')
if __name__=='__main__':unittest.main()
