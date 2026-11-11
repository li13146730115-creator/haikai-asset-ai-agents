(function(root){
'use strict';
const ASOF='2026-11-08',PERIOD='2026-01-01 至 2026-11-08';
const customers={A:'远景科技（模拟）',B:'恒瑞服务（模拟）',C:'海辰商贸（模拟）'};
const contracts=[
{id:'HT-A01',customer:'A',project:'A',asset:'AS-A01',area:1800,end:'2026-12-31',deposit:[20000,30000],renew:[1,3],follow:[1,2],owner:'王晓',room:'A座 101—103'},
{id:'HT-A02',customer:'A',project:'A',asset:'AS-A02',area:1200,end:'2026-11-30',deposit:[20000,20000],renew:[2,3],follow:[0,0],owner:'王晓',room:'A座 201—202'},
{id:'HT-A03',customer:'A',project:'B',asset:'AS-B01',area:1200,end:'2027-03-31',deposit:[0,10000],renew:null,follow:[0,1],owner:'李辰',room:'B座 101—102'},
{id:'HT-B01',customer:'B',project:'A',asset:'AS-A03',area:1000,end:'2027-06-30',deposit:[30000,30000],renew:null,follow:[1,1],owner:'王晓',room:'A座 301'},
{id:'HT-B02',customer:'B',project:'B',asset:'AS-B02',area:1000,end:'2026-11-20',deposit:[20000,20000],renew:[3,3],follow:[0,0],owner:'李辰',room:'B座 201'},
{id:'HT-C01',customer:'C',project:'B',asset:'AS-B03',area:600,end:'2027-01-31',deposit:null,renew:[0,3],follow:[0,1],owner:'李辰',room:'B座 301'},
{id:'HT-C02',customer:'C',project:'B',asset:'AS-B03',area:400,end:'2027-08-31',deposit:null,renew:null,follow:[0,0],owner:'李辰',room:'B座 302'}];
const bills=[
['B-A01-01','HT-A01',70000,70000,70000,'2026-07-31','2026.01—07'],
['B-A01-02','HT-A01',10000,10000,0,'2026-08-31','2026.08'],
['B-A01-03','HT-A01',20000,0,0,'2026-10-31','2026.09—10'],
['B-A02-01','HT-A02',80000,80000,80000,'2026-10-31','2026.01—10'],
['B-A03-01','HT-A03',20000,10000,5000,'2026-11-03','2026.09—10'],
['B-B01-01','HT-B01',120000,114000,108000,'2026-10-31','2026.01—10'],
['B-B02-01','HT-B02',80000,80000,80000,'2026-10-31','2026.01—10'],
['B-C01-01','HT-C01',60000,48000,42000,'2026-10-31','2026.01—10'],
['B-C02-01','HT-C02',40000,40000,40000,'2026-10-31','2026.01—10']
].map(([id,contract,ar,paid,timely,due,period])=>({id,contract,ar,paid,timely,due,period,fee:'租金',balance:ar-paid,overdue:due<ASOF?ar-paid:0}));
const assets=[
['AS-A01','A','A座一层','办公',1800,1800],['AS-A02','A','A座二层','办公',1200,1200],['AS-A03','A','A座三层','办公',1000,1000],['AS-A04','A','A座四层','商业',1000,0],
['AS-B01','B','B座一层','办公',1200,1200],['AS-B02','B','B座二层','商业',1000,1000],['AS-B03','B','B座三层','办公',1000,1000],['AS-B04','B','B座四层','商业',1800,0]
].map(([id,project,name,type,area,leased])=>({id,project,name,type,area,leased}));
const days=end=>Math.round((Date.parse(end)-Date.parse(ASOF))/86400000),sum=(xs,k)=>xs.reduce((s,x)=>s+x[k],0),pct=(n,d)=>d?Math.round(n/d*10000)/100:null;
function visible(scope){return contracts.filter(x=>scope==='all'||x.project===scope)}
function contract(id){const c=contracts.find(x=>x.id===id);if(!c)throw Error('合同不存在');const bs=bills.filter(x=>x.contract===id);return {...c,name:customers[c.customer],bills:bs,ar:sum(bs,'ar'),paid:sum(bs,'paid'),overdue:sum(bs,'overdue'),balance:sum(bs,'balance'),timely:sum(bs,'timely'),latePaid:sum(bs,'paid')-sum(bs,'timely'),days:days(c.end),unallocated:id==='HT-A01'?5000:0}}
function summary(scope){const cs=visible(scope).map(x=>contract(x.id)),as=assets.filter(x=>scope==='all'||x.project===scope);const ar=sum(cs,'ar'),paid=sum(cs,'paid'),area=sum(as,'area'),leased=sum(as,'leased');return{ar,paid,overdue:sum(cs,'overdue'),balance:sum(cs,'balance'),contracts:cs.length,customers:new Set(cs.map(x=>x.customer)).size,assets:as.length,area,leased,occupancy:pct(leased,area),rate:pct(paid,ar),expiring:cs.filter(x=>x.days>=0&&x.days<=90).length}}
function riskSignals(input){
const c=typeof input==='string'?contract(input):input,rs=[];
if(c.overdue>0)rs.push({code:'overdue',label:'逾期欠费',tone:'red',detail:`逾期未核销 ${money(c.overdue)}；需核对收款与账单后安排催缴。`,evidence:c.bills.filter(b=>b.overdue>0).map(b=>b.id),question:'还有哪些账单没交费？',action:'billlist'});
if(c.deposit&&c.deposit[0]<c.deposit[1])rs.push({code:'deposit',label:'保证金不足',tone:'amber',detail:`有效保证金 ${money(c.deposit[0])}，应缴 ${money(c.deposit[1])}，缺口 ${money(c.deposit[1]-c.deposit[0])}。`,evidence:[c.id+' · 保证金条款与有效余额'],question:'保证金交齐了吗？',action:'contractsource'});
if(c.days>=0&&c.days<=90&&c.renew&&c.renew[0]<c.renew[1])rs.push({code:'renewal',label:'续签准备待完成',tone:'amber',detail:`合同于 ${c.end} 结束，剩余 ${c.days} 天；续签准备完成 ${c.renew[0]} / ${c.renew[1]} 项。`,evidence:[c.id+' · 结束日期与续签准备清单'],question:'合同何时到期，续签准备好了吗？',action:'renew'});
const ep=enterpriseProfiles[c.customer],ch=changeProfiles[c.id];
if(ep&&ep.riskLevel>=3)rs.push({code:'enterprise',label:'企业经营风险需关注',tone:'red',detail:`主体风险等级 ${ep.riskLevel}/5，经营异常 ${ep.abnormal} 项、司法风险 ${ep.judicial} 项。外部信息需核验，不等同于本合同违约。`,evidence:ep.refs,question:'企业经营风险如何？',action:'enterprise'});
if(ch&&ch.events.length>=2)rs.push({code:'changes',label:'合同变更较频繁',tone:'amber',detail:`当前合同观察期内有 ${ch.events.length} 次已生效变更，需核对条款与账单同步情况；变更本身不代表违约。`,evidence:ch.events.map(x=>x.id),question:'合同变更是否频繁？',action:'changes'});
return rs;
}
const money=n=>'¥'+Number(n).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});
const scopes={all:'全部授权项目',A:'海淀科技园',B:'创智中心'};
function queryBase(q,scope='all',context={}){
const s=summary(scope),cs=visible(scope).map(x=>contract(x.id));let kind='clarify';
if(/设备|电梯|消防|多经|点位|广告|快递/.test(q))kind='unsupported';
else if(/股价|股票|天气/.test(q))kind='clarify';
else if(/同比|环比|预测|去年|上月|本月|\d{1,2}月|202[0-5]/.test(q))kind='missing';
else if(/远景|恒瑞|海辰|企业|客商|客户/.test(q)&&!/多少家/.test(q))kind='enterprise';
else if(/欠|逾期|催缴|未缴|没缴|未收/.test(q))kind='overdue';
else if(/续签|到期/.test(q))kind='expiry';
else if(/空置|出租率|可租|资产|房源/.test(q)&&!/总览|概览/.test(q))kind='asset';
else if(/回款|应收|已收|实收|核销|收缴/.test(q))kind='payment';
else if(/整体|经营|总览|概览|多少份|多少家/.test(q))kind='overview';
else if(/按项目|展开|明细|为什么|继续|按企业/.test(q)&&['overview','overdue','payment','expiry','asset','enterprise'].includes(context.kind))kind=context.kind;
const base={kind,scope,question:q,period:PERIOD,asof:ASOF,columns:[],rows:[],metrics:[],chart:[],evidence:[],followups:[]};
const metric=(label,value,unit='元')=>({label,value,unit});
const cr=(r,values)=>({id:r.id,values});
const byProject=field=>['A','B'].filter(p=>scope==='all'||scope===p).map(p=>({label:scopes[p],value:summary(p)[field]}));
if(kind==='unsupported')return{...base,title:'该问题不在当前问数范围内',text:'当前支持资产、客商、合同、账单与收款分析；该类业务暂未纳入本次智能问数。可改问回款、欠费、到期合同或资产出租情况。',followups:['当前整体经营概览','哪些合同欠费需要催缴','资产出租率与空置情况']};
if(kind==='missing')return{...base,title:'当前缺少所需期间的数据',text:'演示数据仅包含当前期间汇总快照，无法计算同比、环比、月度切片或未来预测。落地需补充完整历史账单、核销日期和统一比较口径。可以先查看当前回款、欠费或出租率。',followups:['当前整体经营概览','当前回款情况']};
if(kind==='clarify')return{...base,title:'请明确要分析的业务范围',text:'可以查询资产出租、客商关联合同、合同到期、应收核销或逾期催缴。请说明关注的指标、项目或企业。此演示按预设场景识别问题。',followups:['当前整体经营概览','哪些合同欠费需要催缴','资产出租率与空置情况']};
if(kind==='overview')Object.assign(base,{title:'经营总览 · 从数据定位下一步',text:`${scopes[scope]}共有 ${s.assets} 项资产、${s.customers} 家签约客商、${s.contracts} 份履约合同。租金应收 ${money(s.ar)}，已核销 ${money(s.paid)}，回款率 ${s.rate}%；当前逾期未核销 ${money(s.overdue)}。建议优先核对未分配到账，再处理催缴与90天内到期合同。`,metrics:[metric('租金应收',s.ar),metric('已核销',s.paid),metric('逾期未核销',s.overdue),metric('面积出租率',s.occupancy,'%')],columns:['项目','合同数','应收（元）','已核销（元）','逾期（元）'],rows:['A','B'].filter(p=>scope==='all'||scope===p).map(p=>{const t=summary(p);return{values:[scopes[p],t.contracts,money(t.ar),money(t.paid),money(t.overdue)]}}),chart:byProject('ar'),chartTitle:'各项目租金应收（元）',evidence:[`合同台账：${cs.length}份合成合同`,`租金账单：${bills.filter(b=>cs.some(c=>c.id===b.contract)).length}条合成账单`,`资产台账：${s.assets}项可租资产`],followups:['哪些合同欠费需要催缴','90天内到期合同有哪些','资产出租率与空置情况']});
if(kind==='overdue'||kind==='payment'){
const rs=kind==='overdue'?cs.filter(x=>x.overdue>0).sort((a,b)=>b.overdue-a.overdue):cs;
Object.assign(base,{title:kind==='overdue'?'逾期催缴清单 · 先核账，再跟进':'租金回款分析 · 可追溯至合同账单',text:kind==='overdue'?`当前有 ${rs.length} 份合同存在逾期未核销，合计 ${money(s.overdue)}。逾期口径为到期日早于 ${ASOF} 且仍未核销的账单余额。${cs.some(r=>r.id==='HT-A01')?'HT-A01 另有 5,000 元已到账待分配，核销确认前保留原逾期金额。':'已到账但未核销的款项需由财务确认分配。'}`:`应收 ${money(s.ar)}，已核销 ${money(s.paid)}，回款率 ${s.rate}%。实收到账与核销分配应分别呈现；本卡回款率采用已核销/应收。`,metrics:kind==='overdue'?[metric('逾期未核销',s.overdue),metric('涉及合同',rs.length,'份'),metric('逾期客商',new Set(rs.map(x=>x.customer)).size,'家')]:[metric('应收',s.ar),metric('已核销',s.paid),metric('回款率',s.rate,'%')],columns:['合同 / 客商','项目','应收（元）','已核销（元）','逾期（元）'],rows:rs.map(r=>cr(r,[r.id+' / '+r.name,scopes[r.project],money(r.ar),money(r.paid),money(r.overdue)])),chart:byProject(kind==='overdue'?'overdue':'paid'),chartTitle:kind==='overdue'?'各项目逾期未核销（元）':'各项目已核销（元）',evidence:rs.flatMap(r=>r.bills.map(b=>b.id+' · '+b.due)),followups:kind==='overdue'?['按项目分组','远景科技旗下合同回款情况','90天内到期合同有哪些']:['哪些合同欠费需要催缴','资产出租率与空置情况']});
}
if(kind==='expiry'){
const rs=cs.filter(x=>x.days>=0&&x.days<=90).sort((a,b)=>a.days-b.days);
Object.assign(base,{title:'90天内到期合同 · 续签与退出准备',text:`${scopes[scope]}有 ${rs.length} 份合同在90天内到期。到期不等于必然续签，应结合意向确认、方案审批、协议签署及欠费核验推进。点击合同可查看单份合同的准备清单。`,metrics:[metric('90天内到期',rs.length,'份'),metric('30天内到期',rs.filter(x=>x.days<=30).length,'份'),metric('到期合同逾期',sum(rs,'overdue'))],columns:['合同 / 客商','到期日','剩余天数','准备清单','逾期（元）'],rows:rs.map(r=>cr(r,[r.id+' / '+r.name,r.end,r.days+'天',r.renew?r.renew.join(' / ')+'项':'不适用',money(r.overdue)])),evidence:rs.map(r=>r.id+' · 合同结束日 / 续签清单'),followups:['哪些合同欠费需要催缴','当前整体经营概览']});
}
if(kind==='asset'){
const rs=assets.filter(x=>scope==='all'||x.project===scope);
Object.assign(base,{title:'资产出租与空置 · 面积口径',text:`当前可租面积 ${s.area.toLocaleString()} ㎡，已出租 ${s.leased.toLocaleString()} ㎡，空置 ${(s.area-s.leased).toLocaleString()} ㎡，面积出租率 ${s.occupancy}%。使用资产台账去重后的面积快照，同一资产关联多合同不重复计面积。`,metrics:[metric('可租面积',s.area,'㎡'),metric('已租面积',s.leased,'㎡'),metric('空置面积',s.area-s.leased,'㎡'),metric('面积出租率',s.occupancy,'%')],columns:['资产编号 / 名称','项目','类型','可租面积（㎡）','已租面积（㎡）'],rows:rs.map(r=>({values:[r.id+' / '+r.name,scopes[r.project],r.type,r.area,r.leased]})),chart:byProject('occupancy'),chartTitle:'各项目面积出租率（%）',evidence:rs.map(r=>r.id+' · 可租 / 已租面积'),followups:['90天内到期合同有哪些','当前回款情况']});
}
if(kind==='enterprise'){
const key=/恒瑞/.test(q)?'B':/海辰/.test(q)?'C':/远景/.test(q)?'A':context.kind==='enterprise'?context.customer:null;
if(!key)return{...base,kind:'clarify',title:'请选择要分析的客商',text:'可查询远景科技、恒瑞服务或海辰商贸，按客商主数据ID关联其签约合同。企业名称重名时需先选择主体。',followups:['远景科技旗下合同回款情况','恒瑞服务旗下合同回款情况','海辰商贸旗下合同回款情况']};
const rs=cs.filter(x=>x.customer===key),ar=sum(rs,'ar'),paid=sum(rs,'paid');
Object.assign(base,{customer:key,title:customers[key]+' · 关联合同分析',text:`在${scopes[scope]}范围，该客商关联 ${rs.length} 份合同，租金应收 ${money(ar)}，已核销 ${money(paid)}，回款率 ${pct(paid,ar)??'—'}%。仅汇总当前授权范围内的签约合同；租金与保证金分别核算。`,metrics:[metric('应收',ar),metric('已核销',paid),metric('逾期未核销',sum(rs,'overdue')),metric('关联合同',rs.length,'份')],columns:['合同','项目 / 资源','应收（元）','已核销（元）','逾期（元）'],rows:rs.map(r=>cr(r,[r.id,scopes[r.project]+' / '+r.room,money(r.ar),money(r.paid),money(r.overdue)])),chart:rs.map(r=>({label:r.id,value:pct(r.paid,r.ar)})),chartTitle:'各合同回款率（%）',evidence:rs.map(r=>r.id+' · 签约客商ID '+key),followups:['哪些合同欠费需要催缴','90天内到期合同有哪些']});
}
return base;
}

// All external profiles, changes and project policies below are synthetic demonstration fixtures.
const enterpriseProfiles={
A:{riskLevel:3,abnormal:1,judicial:1,status:'存续',updated:'2026-11-08 09:00',refs:['EXT-A-01 · 经营异常样例','EXT-A-02 · 司法风险样例'],source:'企业信息接口（企查查接入拟定，当前为模拟）'},
B:{riskLevel:0,abnormal:0,judicial:0,status:'存续',updated:'2026-11-08 09:00',refs:['EXT-B-01 · 主体核验样例'],source:'企业信息接口（当前为模拟）'},C:null};
const changeProfiles=Object.fromEntries(contracts.map(c=>[c.id,c.id==='HT-C01'?null:{events:c.id==='HT-A01'?[{id:'CH-A01-01',date:'2026-03-01',type:'租金调整',detail:'生效租金条款调整，已同步对应账单',status:'已生效'},{id:'CH-A01-02',date:'2026-07-01',type:'付款周期调整',detail:'付款周期调整，已完成审批',status:'已生效'}]:[]} ]));
const projectPolicies={A:{id:'COL-HD-01',version:'V1（演示）',name:'海淀科技园催缴分级规则',stages:[{maxDays:7,name:'付款提醒',action:'核账后电话或短信提醒',evidence:'保留通话纪要、短信送达截图和付款反馈'},{maxDays:30,name:'书面催缴',action:'核账后发送书面催缴通知并约定付款时间',evidence:'保留通知版本、发送或送达记录、客户承诺'},{maxDays:90,name:'专项跟进',action:'负责人复核未履约原因，组织专项沟通',evidence:'保留对账确认、沟通纪要及审批意见'},{maxDays:Infinity,name:'升级评估',action:'提交负责人及法务评估后续处置',evidence:'保留核账、历次送达与法务审核记录'}]},B:null};
const scheduledBills=[{id:'F-A-01',project:'A',contract:'HT-B01',due:'2026-12-01',ar:60000,paid:0},{id:'F-B-01',project:'B',contract:'HT-C02',due:'2026-12-01',ar:30000,paid:0}];
function radar(id){const c=contract(id),ep=enterpriseProfiles[c.customer],ch=changeProfiles[id];return[
{key:'payment',label:'回款完成',value:pct(c.paid,c.ar),unit:'%',fact:`已核销 ${money(c.paid)} / 应收 ${money(c.ar)}`,formula:'有效核销金额 / 当前期间生效应收 × 100%',question:'还有哪些账单没交费？'},
{key:'timely',label:'付款及时',value:pct(c.timely,c.ar),unit:'%',fact:`按期核销 ${money(c.timely)} / 到期应收 ${money(c.ar)}`,formula:'按期到账并核销金额 / 到期应收 × 100%；历史迟付不等于当前欠费',question:'历史付款是否及时？'},
{key:'deposit',label:'保证金到位',value:c.deposit?pct(...c.deposit):null,unit:'%',fact:c.deposit?`有效 ${money(c.deposit[0])} / 应缴 ${money(c.deposit[1])}`:'保证金记录缺失，待核验',formula:'有效保证金 / 当前生效应缴 × 100%；缺失不补0',question:'保证金交齐了吗？'},
{key:'enterprise',label:'主体经营',value:ep?(5-ep.riskLevel)*20:null,unit:'分',fact:ep?`主体风险等级 ${ep.riskLevel}/5；经营异常 ${ep.abnormal} 项、司法风险 ${ep.judicial} 项`:'企业信息未取得，不能判断主体风险',formula:'演示映射：(5－主体风险等级) × 20；越高表示风险信号越少，非信用评级；生产分级需业务确认',question:'企业经营风险如何？'},
{key:'stability',label:'合同稳定',value:ch?Math.max(0,100-ch.events.length*15):null,unit:'分',fact:ch?`观察期：2026-01-01 至 ${ASOF}；当前合同已生效变更 ${ch.events.length} 次`:'合同变更记录未取得，不当作零变更',formula:'演示映射：max(0, 100－已生效变更次数 × 15)；新签合同不算当前合同变更，变更不直接认定违约',question:'合同变更是否频繁？'}]}
function collectionAdvice(id){const c=typeof id==='string'?contract(id):id,policy=projectPolicies[c.project];const overdueBills=c.bills.filter(b=>b.overdue>0);const age=Math.max(0,...overdueBills.map(b=>-days(b.due)));if(!c.overdue)return{source:'当前账单事实',configured:!!policy,age,stage:'无需逾期催缴',action:'当前无逾期未核销余额，按付款节点持续跟踪。',evidence:'保持账单与核销记录可追溯。',policy:null};
const stage=policy?.stages.find(s=>age<=s.maxDays);return{source:policy?`项目规则 · ${policy.id} · ${policy.version}`:'AI建议 · 项目未配置催缴规则',configured:!!policy,age,stage:stage?.name||'先核账并沟通',action:stage?.action||'建议财务先核对账单与到账，由经办人与客户确认未付款原因及计划；处置方式由负责人确认。',evidence:stage?.evidence||'建议保留对账记录、付款凭证、沟通纪要与客户回复。',policy:policy?.id||null}}
function contractReport(id){const c=contract(id),axes=radar(id),ep=enterpriseProfiles[c.customer],ch=changeProfiles[id],ad=collectionAdvice(c),gap=c.deposit?Math.max(0,c.deposit[1]-c.deposit[0]):null;
const blocks=[
{key:'payment',title:'回款与账龄',status:c.overdue?'需要跟进':'已结清',fact:`当前应收 ${money(c.ar)}，已核销 ${money(c.paid)}，逾期未核销 ${money(c.overdue)}。${c.overdue?'最长逾期 '+ad.age+' 天。':''}`,analysis:c.overdue?`逾期来自 ${c.bills.filter(b=>b.overdue>0).map(b=>b.id).join('、')}。${c.unallocated?'另有 '+money(c.unallocated)+' 到账待分配，未核销前保留原余额；不能把已到账与已核销混用。':'应先确认收款流水与账单关联，再确定催缴金额。'}`:'当前有效账单均已结清，不能仅因历史迟付继续标记当前欠费。',advice:c.overdue?`先由财务复核金额，再由 ${c.owner} 按“${ad.stage}”跟进：${ad.action}。沟通时列明合同、账单、费用期与复核后的金额，确认客户预计付款日；${ad.evidence}。`:'按下期账单到期节点提醒付款，继续保留收款及核销凭证。',source:ad.source,action:'billlist',label:'核对账单与到账'},
{key:'timely',title:'付款行为',status:c.latePaid?'关注历史迟付':'按期履行',fact:`按期核销 ${money(c.timely)}，历史迟付且已结清 ${money(c.latePaid)}；按期完成率 ${pct(c.timely,c.ar)}%。`,analysis:c.latePaid?`当前存在历史迟付事实。${ep&&ep.riskLevel>=3?'叠加主体经营风险信号，后续付款节点应重点跟踪；这不构成未来欠款的确定预测。':'历史迟付需与当前欠费分开判断；已结清款项不重复催缴。'}`:'已核销部分未发现历史迟付样例；仅反映当前数据覆盖期。',advice:c.latePaid?'下个付款节点前主动确认付款计划；若再次迟付，记录原因与承诺日期。续签谈判时可评估付款周期及保障安排，具体条件由业务审批。':'按约定节点持续核对到账，不因当前及时就免除后续监测。',source:'账单到期日 + 核销对应实际到账日',action:'billlist',label:'查看付款依据'},
{key:'deposit',title:'保证金保障',status:gap===null?'资料待核验':gap?'保障不足':'已到位',fact:gap===null?'应缴或有效保证金记录未取得，无法计算缺口。':`应缴 ${money(c.deposit[1])}，有效 ${money(c.deposit[0])}，缺口 ${money(gap)}。`,analysis:gap===null?'缺失数据不能按0元，也不能据此认定保证金已交齐。':gap?'当前保障金额低于生效约定，需结合到账、退还和抵扣流水核查。':'保障余额与应缴匹配；保证金不计入租金回款。',advice:gap===null?'由财务补齐条款与保证金流水后复核。':gap?'核对退款及抵扣后，向客商确认补缴情形与时间；续签时结合迟付和主体情况评估保障条件，不能自动变更现有应缴。':'继续核对后续退款、抵扣及保证函有效期。',source:'生效保证金条款与有效余额',action:'contractsource',label:'查看保证金依据'},
{key:'enterprise',title:'企业经营与外部风险',status:ep?ep.riskLevel>=3?'需重点核验':'当前未见异常样例':'数据未取得',fact:ep?`${c.name}，登记状态 ${ep.status}；经营异常 ${ep.abnormal} 项、司法风险 ${ep.judicial} 项；数据更新 ${ep.updated}。`:'当前未取得签约主体的企业经营信息。',analysis:ep?(ep.riskLevel>=3?'主体风险与付款及时性需要联合观察：即使部分账单已结清，也需核验异常事项的时间、有效性及与履约的关联；外部命中不直接认定合同违约。':'当前覆盖的外部样例未见风险信号；这不能保证主体未来无风险。'):'尚不能做主体风险判断，不输出“企业优质”或“风险可控”。',advice:ep?'按统一主体标识核验原始事件，记录核验结论。涉及续签、增加保证金或法律措施时提交业务及法务复核，不由AI自动决定。':'补齐已授权的企业信息接口及主体标识映射，再分析。',source:ep?.source||'企业信息来源缺失',action:'enterprise',label:'查看企业信息与风险依据'},
{key:'stability',title:'合同条款与变更',status:ch?ch.events.length>=2?'关注变更频次':'当前较稳定':'数据未取得',fact:ch?`本合同观察期内 ${ch.events.length} 次已生效变更${ch.events.length?'，涉及 '+ch.events.map(x=>x.type).join('、'):''}。`:'未取得当前合同的版本与变更记录。',analysis:ch?ch.events.length>=2?'多次调整反映条款执行需要跟踪，应核对每次审批、生效日期与账单同步；不把其他新签合同算作本合同变更，不直接以频次认定违约。':'当前样例未记录已生效变更；仍应以完整版本记录复核。':'无法判断条款稳定性，不能按“零次变更”处理。',advice:ch?'复核当前生效版本、租金、付款周期与主体是否一致；发现账单未同步时交由合同经办与财务校正后重新分析。':'补齐当前合同的生效版本和审批记录；若系统以重签替代变更，只记录关联关系，暂不计变更次数。',source:'当前合同版本/审批/生效记录（演示）',action:'changes',label:'查看变更记录'}];
const expiry=c.days>=0&&c.days<=90?{title:'到期与下一份合同安排',fact:`合同于 ${c.end} 到期，剩余 ${c.days} 天；准备项 ${c.renew?c.renew.join('/'):'来源缺失'}。`,advice:`由 ${c.owner} 核实续签意向与新合同发起状态。${c.overdue||c.latePaid?'结合欠费、历史迟付和主体经营信息，提交是否续签及保障条件的评估；不自动建议具体保证金倍数。':'提前安排续签或退出结算。'}到期提醒继续保留，不占用雷达维度。`}:null;
return{axes,blocks,expiry,advice:ad,good:axes.filter(a=>a.value!==null&&a.value>=90).length,attention:axes.filter(a=>a.value!==null&&a.value>=60&&a.value<90).length,risk:axes.filter(a=>a.value!==null&&a.value<60).length,missing:axes.filter(a=>a.value===null).length}}
function answer(q,scope='all',context={}){
const mentioned=['A','B'].filter(p=>(p==='A'?/海淀科技园|项目A/:/创智中心|项目B/).test(q));
const forbidden=/新城中心|未授权项目|无权限项目/.test(q)||mentioned.some(p=>scope!=='all'&&p!==scope);
if(forbidden)return{kind:'denied',scope,question:q,asof:ASOF,period:PERIOD,title:'当前无此项目的查询授权',text:'当前账号无权查询该项目。未返回该项目的金额、数量或明细；如因工作需要，请联系管理员核实授权。',columns:[],rows:[],metrics:[],chart:[],evidence:[],followups:['当前整体经营概览','哪些合同欠费需要催缴']};
const resolved=mentioned.length===1?mentioned[0]:mentioned.length>1?'all':/全部|整体|各项目/.test(q)?scope:context.scope&&scope==='all'?context.scope:scope;
if(/设备|电梯|消防|多经|点位|广告|快递/.test(q))return queryBase(q,resolved,context);
const noData=/超过\s*(100万|1000000)/.test(q)&&/欠|逾期/.test(q);
if(noData)return{kind:'empty',scope:resolved,question:q,asof:ASOF,period:PERIOD,title:'当前范围无符合条件的合同',text:'在当前授权范围及数据期间，未找到逾期未核销金额超过100万元的合同。查询已完成；无符合条件的记录与数据缺失是不同状态。',columns:[],rows:[],metrics:[],chart:[],evidence:['授权合同与有效账单；筛选：逾期未核销 > 1,000,000元'],followups:['哪些合同欠费需要催缴','当前回款情况']};
const route=/年底|年末/.test(q)&&!/同比|预测/.test(q)?'yearend':/合同规模|合同数量|多少合同|合同类指标/.test(q)?'contracts':/资产规模/.test(q)?'asset':null;
if(route&&route!=='yearend'&&/同比|环比|预测|去年|本月|上月/.test(q))return queryBase(q,resolved,context);
let a=queryBase(route==='asset'?'资产出租率':route==='contracts'?'整体经营概览':q,resolved,context);
if(route==='contracts'){const cs=visible(resolved).map(x=>contract(x.id));a={...a,kind:'contracts',title:'合同规模与到期分布',text:`当前授权查询范围共有 ${cs.length} 份履约合同，关联 ${new Set(cs.map(x=>x.customer)).size} 家客商；90天内到期 ${cs.filter(x=>x.days>=0&&x.days<=90).length} 份。`,metrics:[{label:'履约合同',value:cs.length,unit:'份'},{label:'签约客商',value:new Set(cs.map(x=>x.customer)).size,unit:'家'},{label:'90天内到期',value:cs.filter(x=>x.days>=0&&x.days<=90).length,unit:'份'}],columns:['合同 / 客商','项目','到期日','剩余天数'],rows:cs.map(c=>({id:c.id,values:[c.id+' / '+c.name,scopes[c.project],c.end,c.days+'天']})),chart:[],evidence:cs.map(c=>c.id+' · 生效合同台账'),followups:['90天内到期合同有哪些','哪些合同欠费需要催缴']};}
if(route==='yearend'){const f=scheduledBills.filter(b=>resolved==='all'||b.project===resolved),cs=visible(resolved).map(x=>contract(x.id)),due=sum(f,'ar'),out=sum(cs,'balance');a={...a,kind:'yearend',title:'年底前待回收账单 · 已生成计划',text:`截至 ${ASOF}，已到期未核销 ${money(out)}；已生成、年底前到期但当前未到期的账单 ${money(due)}，合计待回收 ${money(out+due)}。这是账单计划余额，不是未来收入或实际到账预测。`,metrics:[{label:'已到期未核销',value:out,unit:'元'},{label:'年底前未到期账单',value:due,unit:'元'},{label:'合计待回收',value:out+due,unit:'元'}],columns:['账单 / 合同','项目','到期日','待回收（元）','状态'],rows:[...cs.flatMap(c=>c.bills.filter(b=>b.balance>0).map(b=>({id:c.id,values:[b.id+' / '+c.id,scopes[c.project],b.due,money(b.balance),'已到期']}))),...f.map(b=>({id:b.contract,values:[b.id+' / '+b.contract,scopes[b.project],b.due,money(b.ar-b.paid),'未到期']}))],chart:[],evidence:['有效账单 + 已生成未来账单（合成样例），观察至2026-12-31'],followups:['哪些合同欠费需要催缴','90天内到期合同有哪些']};}
const s=summary(resolved),cs=visible(resolved).map(x=>contract(x.id));
if(a.rows.length){
if(['overview','payment','overdue'].includes(a.kind)){const top=cs.filter(c=>c.overdue>0).sort((a,b)=>b.overdue-a.overdue);a.insights=[`当前回款率 ${s.rate}%，未核销 ${money(s.balance)}。${resolved==='all'?'创智中心逾期占应收11%，高于海淀科技园8.67%；应关注比例与金额两个口径。':''}`,top.length?`优先核对 ${top.slice(0,2).map(c=>c.id+'（'+money(c.overdue)+'）').join('、')}。最长逾期 ${Math.max(...top.flatMap(c=>c.bills.filter(b=>b.overdue>0).map(b=>-days(b.due))))} 天；当前样例不支持认定多月拖欠或持续恶化。`:'当前未发现逾期未核销账单。'];}
else if(a.kind==='asset')a.insights=[`空置面积 ${s.area-s.leased}㎡，占可租面积 ${pct(s.area-s.leased,s.area)}%。${resolved==='all'?'创智中心空置1,800㎡、出租率64%，海淀科技园空置1,000㎡、出租率80%。':''}可先核对可租状态及资源属性，再安排招商；资产面积按资源ID去重。`];
else if(a.kind==='yearend')a.insights=['已逾期款项先核账并按项目规则跟进；未到期账单按付款节点提前沟通。待回收额不含尚未生成的账单，不把保证金混入租金。'];
else if(a.kind==='contracts'||a.kind==='expiry')a.insights=[`先按结束日安排意向确认、续签或退出，结合该合同欠费与保证金核验；到期不代表自动续签。可点合同进入履约分析。`];
else a.insights=['按同一客商主数据ID关联合同；金额先在账单层聚合，避免一企业多合同、多资源关系重复累加。可下钻单合同核对风险与付款依据。'];
}
return a;
}
const SCENES=[
['C01','contract','履约总览','一线 / 管理者','这份合同目前有哪些需要处理的？','当前合同、账单、核销、保证金、企业信息、变更、项目规则','锁定合同 → 拉取事实 → 计算指标 → 中台解释 → 结果卡','HT-A01显示逾期20,000元、保证金缺口10,000元、53天到期。','仅当前合同；缺失维度单列，不产出信用评级。'],
['C02','contract','应收与未缴','收费 / 财务','这份合同哪些账单还没交费？','账单ID、费用项、计费期、应收、到期日、核销分配','账单余额汇总 → 区分未到期/逾期 → 下钻明细','HT-A01仅B-A01-03欠20,000元；历史迟付已结清账单不算欠费。','作废账单排除；到账待分配不自动抵减。'],
['C03','contract','逾期催缴','一线 / 负责人','需要催缴吗？帮我写一份催缴内容','逾期账单、客户、负责人、已到账待分配、催缴记录','核账提示 → 选择账单 → 生成草稿 → 人工复核','草稿引用合同号、账单号及20,000元；提示先核对5,000元待分配到账。','原型仅本地草稿；实际发出走原业务确认流程。'],
['C04','contract','续签准备','招商 / 管理者','合同快到期了吗，续签准备得怎样？','结束日、90天阈值、续签意向、方案审批、协议状态','计算剩余天数 → 检查准备清单 → 形成待办建议','HT-A01剩余53天，准备完成1/3项。','准备进度不是续签概率，不自动延长合同。'],
['C05','contract','付款及时性','财务 / 管理者','历史付款是否及时？','账单到期日、核销分配、对应到账日期','按期分配金额统计 → 识别迟付 → 展示事实','HT-A01按期核销70,000元，已核销80,000元，迟付已结清10,000元。','按期核销/到期应收；补录时间不替代实际到账时间。'],
['C06','contract','保证金核验','财务 / 一线','保证金是否交齐？','保证金条款、应缴、有效到账、退还/抵扣记录','适用性判断 → 有效余额 → 缺口与来源','HT-A01缺口10,000元；HT-C01显示来源缺失。','保证金不混入租金回款；未知值不填0。'],
['C07','contract','到账待分配','财务','客户说已付款，为什么仍欠费？','收款流水、核销分配、到账日期、合同关联','区分到账与核销 → 展示差异 → 提示核对','HT-A01保留20,000元逾期，同时展示5,000元待分配。','需要财务正式核销后刷新，不自动修改账。'],
['C08','contract','企业风险与条款稳定','负责人 / 管理者','企业是否有经营风险，合同变更是否频繁？','统一主体标识、外部风险事件、当前合同版本与生效变更','主体匹配 → 事件核验 → 分项指标 → 与付款行为联合解读','HT-A01主体演示分40、合同稳定70；HT-C01缺失时显示待核验。','分级是演示规则，变更不等同违约；外部命中需核验，不作信用评级。'],
['Q01','ask','经营总览','管理者','当前整体经营情况如何？','资产、客商、合同、租金账单、核销','授权过滤 → 多域聚合 → 结论/指标/项目表','7合同、3客商、应收500,000元、核销452,000元。','每个指标明确口径与截至时间。'],
['Q02','ask','欠费催缴分布','一线 / 管理者','目前哪些合同欠费，需要催缴？','账单、核销、到期日、合同、客商、项目','余额过滤 → 合同/项目聚合 → 合同下钻','4份合同逾期48,000元；海淀科技园 26,000元、B 22,000元。','授权项目内查询；零余额不进入催缴清单。'],
['Q03','ask','回款分析','财务 / 管理者','各项目回款情况怎么样？','应收账单、核销、项目归属','统一期间 → 项目分组 → 金额/回款率','海淀科技园应收300,000元、核销274,000元、回款率91.33%。','不以银行流水总额替代已核销。'],
['Q04','ask','企业关联合同','招商 / 管理者','远景科技签了哪些合同，回款怎么样？','客商ID、签约关系、合同、账单、核销','主体消歧 → 关联合同 → 分合同对比/总计','全部范围远景3份合同，应收200,000元；创智中心仅1份、20,000元。','同名需澄清；同合同多资源关联不得重复汇总。'],
['Q05','ask','到期统筹','招商 / 管理者','90天内哪些合同到期？','合同结束日、合同状态、负责人、准备清单','到期窗口过滤 → 按剩余天数排序 → 单合同跳转','固定日期下4份合同在90天内到期，2份在30天内。','到期日与续签状态分开展示。'],
['Q06','ask','资产出租与空置','招商 / 管理者','资产出租率多少，哪里空置？','可租资产、面积快照、有效租用关系','资产去重 → 可租/已租面积 → 项目/资产明细','可租10,000㎡，已租7,200㎡，出租率72%。','台账数量与面积出租率不混用。'],
['Q09','ask','连续追问与会话回看','所有用户','按项目展开；查看上次查询结果','会话ID、上下文、授权范围、结果快照、时间','继承意图 → 补充维度 → 保存快照 → 回看','欠费问题后追问按项目分组仍为欠费分析；右侧点历史恢复原结果。','历史不自动更新；重新查询形成新快照。'],
['Q10','ask','数据不足与澄清','所有用户','今年收入同比增长多少？','指标目录、可用期间、数据覆盖','识别口径/来源缺失 → 说明缺口 → 建议替代问题','当前单期样例返回缺少去年同期，不生成增长率。','不支持问题需澄清，不展示伪造图表。'],
['Q11','ask','授权与空结果','业务 / 管理者','新城中心回款情况；逾期超过100万元的合同','服务端授权范围、指标查询状态、筛选条件','先鉴权 → 有权再查询 → 区分拒绝/空结果/来源缺失','无权限不返回指标；无匹配合同明确为空，不伪造数值。','页面不提供授权项目选择器；生产权限必须在服务端执行。'],
['Q12','ask','年底待回收计划','财务 / 管理者','年底前还有多少账单待回收？','已到期账单、年底前已生成未到期账单、核销分配','区分到期状态 → 计算计划余额 → 账单下钻','逾期48,000元 + 未到期90,000元 = 138,000元。','账单计划不等于实际回款预测，未生成账单不纳入。']
].map(([id,agent,title,role,question,data,flow,accept,boundary])=>({id,agent,title,role,question,data,flow,accept,boundary}));
const api={ASOF,PERIOD,customers,contracts,bills,assets,scopes,visible,contract,summary,riskSignals,radar,answer,enterpriseProfiles,changeProfiles,projectPolicies,scheduledBills,collectionAdvice,contractReport,SCENES,money,pct};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CoreModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
