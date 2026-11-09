"""Local-only HTTP reference for frontend / Agent integration. Python 3.9+."""
import argparse
import json
import re
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
from service import Service,ApiError,reject,uid

class Application:
    def __init__(self,service=None):self.service=service or Service()
    def handle(self,method,path,headers,body=None):
        try:
            split=urlsplit(path);params=parse_qs(split.query,keep_blank_values=True)
            if any(len(v)!=1 for v in params.values()):reject('INVALID_REQUEST','查询参数不得重复')
            params={k:v[0] for k,v in params.items()};path=split.path
            if method=='GET' and path=='/openapi.json' and not params:return 200,json.loads(Path(__file__).with_name('openapi.json').read_text())
            if method=='GET' and path=='/health' and not params:return 200,{'status':'ok','mode':'DEMO_ONLY','llm_connected':False}
            headers={k.lower():v for k,v in headers.items()};auth=headers.get('authorization','')
            if not auth.startswith('Bearer '):reject('AUTH_REQUIRED','需要有效登录态',401)
            ctx=self.service.context(auth[7:])
            if method=='GET' and params and not path.endswith('/details'):reject('INVALID_REQUEST','此接口无查询参数')
            if method=='POST' and params:reject('INVALID_REQUEST','POST参数须放JSON请求体')
            if method=='GET' and path=='/v1/context':return 200,{k:v for k,v in ctx.items() if not k.startswith('_')}
            methods={
                '/v1/resolve':(self.service.resolve,200),
                '/v1/analyses/contract':(self.service.contract,201),
                '/v1/analyses/enterprise':(self.service.enterprise,201),
                '/v1/analyses/collection':(self.service.collection,201),
                '/v1/review-drafts':(self.service.create_draft,201),
                '/v1/agent-runs':(self.service.agent_run,201)}
            with self.service.lock:
                if method=='POST' and path in methods:
                    fn,status=methods[path];return status,fn(ctx,body)
                match=re.fullmatch(r'/v1/analyses/([^/]+)(?:/(details|recheck))?',path)
                if match:
                    id,action=match.groups()
                    if method=='GET' and action is None:return 200,self.service.get_analysis(ctx,id)
                    if method=='GET' and action=='details':return 200,self.service.detail(ctx,id,params)
                    if method=='POST' and action=='recheck':
                        if body!={}:reject('INVALID_REQUEST','重新核验体须为空对象；范围变更使用新建分析接口')
                        return 201,self.service.recheck(ctx,id)
                match=re.fullmatch(r'/v1/review-drafts/([^/]+)/confirm',path)
                if method=='POST' and match:
                    return 200,self.service.confirm_draft(ctx,match.group(1),body,headers.get('idempotency-key'))
                reject('ROUTE_NOT_FOUND','接口不存在',404)
        except ApiError as e:return e.http_status,{'error':{'code':e.code,'message':e.message,'retryable':e.code in ['SOURCE_INCONSISTENT']},'request_id':uid('REQ')}

class Handler(BaseHTTPRequestHandler):
    app=None
    def do_GET(self):self.dispatch()
    def do_POST(self):self.dispatch()
    def dispatch(self):
        try:
            body=None
            if self.command=='POST':
                if self.headers.get('Content-Type','').split(';')[0].strip()!='application/json':reject('INVALID_REQUEST','Content-Type必须为application/json')
                raw_length=self.headers.get('Content-Length','0')
                if not raw_length.isdigit():reject('INVALID_REQUEST','Content-Length不合法')
                length=int(raw_length)
                if length>65536:reject('PAYLOAD_TOO_LARGE','请求体不能超过64KB',413)
                try:body=json.loads(self.rfile.read(length))
                except (ValueError,UnicodeDecodeError):reject('INVALID_JSON','请求体不是合法JSON',400)
            status,data=self.app.handle(self.command,self.path,dict(self.headers),body)
        except ApiError as e:status,data=e.http_status,{'error':{'code':e.code,'message':e.message,'retryable':False},'request_id':uid('REQ')}
        except Exception:
            status,data=500,{'error':{'code':'INTERNAL_ERROR','message':'参考服务内部错误','retryable':False},'request_id':uid('REQ')}
        raw=json.dumps(data,ensure_ascii=False,separators=(',',':')).encode()
        self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Content-Length',str(len(raw)));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(raw)
    def log_message(self,format,*args):sys.stderr.write('reference-api '+format%args+'\n')

def main():
    parser=argparse.ArgumentParser(description='DEMO only; no real SSO/LLM/database. Bind localhost only.')
    parser.add_argument('--port',type=int,default=8765);args=parser.parse_args();Handler.app=Application()
    print('Demo API: http://127.0.0.1:'+str(args.port)+' | tokens: demo-manager / demo-clerk-a / demo-finance',flush=True)
    ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
if __name__=='__main__':main()
