"""Real HTTP smoke client; start server.py first. Demo data only."""
import argparse,json
from urllib.request import Request,urlopen

def main():
    p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8765);args=p.parse_args();base='http://127.0.0.1:'+str(args.port)
    def call(method,path,body=None,token='demo-manager',key=None):
        headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'}
        if key:headers['Idempotency-Key']=key
        req=Request(base+path,data=json.dumps(body).encode() if body is not None else None,headers=headers,method=method)
        with urlopen(req,timeout=10) as response:return json.load(response)
    a=call('POST','/v1/analyses/contract',{'contract_id':'HT-A01','as_of':'2026-11-08'},'demo-clerk-a');assert a['data']['financial']['unsettled_fen']==2000000
    e=call('POST','/v1/analyses/enterprise',{'enterprise_ids':['A'],'as_of':'2026-11-08'});assert e['data']['enterprises'][0]['dimensions'][0]['value_bps']==8500
    det=call('GET','/v1/analyses/'+e['analysis_id']+'/details?dimension_id=R1&contract_id=HT-A01');assert det['data']['rows'][0]['numerator']==8000000
    d=call('POST','/v1/review-drafts',{'analysis_id':a['analysis_id'],'action_type':'PAYMENT_REVIEW'},'demo-clerk-a')
    path='/v1/review-drafts/'+d['draft_id']+'/confirm';body={'expected_revision':d['source_revision']};key='smoke-'+d['draft_id']
    first=call('POST',path,body,'demo-clerk-a',key);second=call('POST',path,body,'demo-clerk-a',key);assert first['work_item_id']==second['work_item_id'];assert first['financial_write_performed'] is False
    new=call('POST','/v1/analyses/'+a['analysis_id']+'/recheck',{},'demo-clerk-a');assert new['analysis_id']!=a['analysis_id'];assert new['data']['financial']['unsettled_fen']==2000000
    print(json.dumps({'http_chain':'PASS','analysis_id':a['analysis_id'],'enterprise_analysis_id':e['analysis_id'],'work_item_id':first['work_item_id'],'recheck_analysis_id':new['analysis_id'],'financial_write':False,'llm_called':False},ensure_ascii=False))
if __name__=='__main__':main()
