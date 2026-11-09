import unittest
from datetime import datetime,timezone,timedelta
from service import Service,ApiError
class BoundaryTests(unittest.TestCase):
    def setUp(self):self.s=Service();self.c=self.s.context('demo-clerk-a');self.m=self.s.context('demo-manager')
    def err(self,code,call):
        with self.assertRaises(ApiError) as e:call()
        self.assertEqual(e.exception.code,code)
    def test_details_stale_snapshot_does_not_mix_new_data(self):
        a=self.s.enterprise(self.m,{'enterprise_ids':['A'],'as_of':'2026-11-08'});self.s.adapter.allocate_demo_receipt()
        self.err('STALE_SNAPSHOT',lambda:self.s.detail(self.m,a['analysis_id'],{'dimension_id':'R1'}))
    def test_draft_expiry(self):
        a=self.s.contract(self.c,{'contract_id':'HT-A01','as_of':'2026-11-08'});d=self.s.create_draft(self.c,{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW'})
        self.s.drafts[d['draft_id']]['expires_at']=(datetime.now(timezone.utc)-timedelta(seconds=1)).isoformat()
        self.err('DRAFT_EXPIRED',lambda:self.s.confirm_draft(self.c,d['draft_id'],{'expected_revision':d['source_revision']},'expired'))
    def test_source_inconsistent_does_not_silently_clamp(self):
        self.s.adapter.data['allocations'][0]['amount_fen']=999999999
        self.err('SOURCE_INCONSISTENT',lambda:self.s.contract(self.m,{'contract_id':'HT-A01','as_of':'2026-11-08'}))
    def test_revoked_token_cannot_reuse_context(self):
        del self.s.adapter.users['demo-clerk-a']
        self.err('AUTH_REQUIRED',lambda:self.s.contract(self.c,{'contract_id':'HT-A01','as_of':'2026-11-08'}))
    def test_invalid_id_not_internal_error(self):
        self.err('INVALID_REQUEST',lambda:self.s.create_draft(self.c,{'analysis_id':['bad'],'action_type':'PAYMENT_REVIEW'}))
    def test_period_filter_not_silently_ignored(self):
        self.err('INVALID_REQUEST',lambda:self.s.enterprise(self.m,{'as_of':'2026-11-08','period':{'from':'2026-01-01','to':'2026-11-08'}}))
if __name__=='__main__':unittest.main()

class RoleScopeTests(unittest.TestCase):
    def test_collection_role_without_enterprise_filter_still_restricts_contracts(self):
        s=Service();m=s.context('demo-manager')
        a=s.enterprise(m,{'as_of':'2026-11-08','role_scope':['PAYER']})
        self.assertEqual(a['data']['contract_count'],0)
        self.assertEqual(a['data']['financial']['receivable_fen'],0)
