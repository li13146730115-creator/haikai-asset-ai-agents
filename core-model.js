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
const points=[{id:'PT-01',project:'A',name:'A座大堂广告位',ar:8000,paid:8000},{id:'PT-02',project:'B',name:'B座快递柜点位',ar:4000,paid:3000}];
const devices=[{id:'EQ-01',project:'A',name:'电梯',count:4},{id:'EQ-02',project:'A',name:'消防泵',count:2},{id:'EQ-03',project:'B',name:'电梯',count:3},{id:'EQ-04',project:'B',name:'消防泵',count:2}];
const days=end=>Math.round((Date.parse(end)-Date.parse(ASOF))/86400000),sum=(xs,k)=>xs.reduce((s,x)=>s+x[k],0),pct=(n,d)=>d?Math.round(n/d*10000)/100:null;
function visible(scope){return contracts.filter(x=>scope==='all'||x.project===scope)}
function contract(id){const c=contracts.find(x=>x.id===id);if(!c)throw Error('合同不存在');const bs=bills.filter(x=>x.contract===id);return {...c,name:customers[c.customer],bills:bs,ar:sum(bs,'ar'),paid:sum(bs,'paid'),overdue:sum(bs,'overdue'),balance:sum(bs,'balance'),timely:sum(bs,'timely'),latePaid:sum(bs,'paid')-sum(bs,'timely'),days:days(c.end),unallocated:id==='HT-A01'?5000:0}}
function summary(scope){const cs=visible(scope).map(x=>contract(x.id)),as=assets.filter(x=>scope==='all'||x.project===scope);const ar=sum(cs,'ar'),paid=sum(cs,'paid'),area=sum(as,'area'),leased=sum(as,'leased');return{ar,paid,overdue:sum(cs,'overdue'),balance:sum(cs,'balance'),contracts:cs.length,customers:new Set(cs.map(x=>x.customer)).size,assets:as.length,area,leased,occupancy:pct(leased,area),rate:pct(paid,ar),expiring:cs.filter(x=>x.days>=0&&x.days<=90).length}}
function radar(id){const c=contract(id);return[
{key:'payment',label:'回款完成',value:pct(c.paid,c.ar),fact:`已核销 ${c.paid.toLocaleString()} / 应收 ${c.ar.toLocaleString()} 元`,question:'还有哪些账单没交费？'},
{key:'timely',label:'付款及时',value:pct(c.timely,c.ar),fact:`按期核销 ${c.timely.toLocaleString()} / 到期应收 ${c.ar.toLocaleString()} 元`,question:'历史付款是否及时？'},
{key:'deposit',label:'保证金到位',value:c.deposit?pct(...c.deposit):null,fact:c.deposit?`有效保证金 ${c.deposit[0].toLocaleString()} / 应缴 ${c.deposit[1].toLocaleString()} 元`:'保证金来源缺失，待补录',question:'保证金交齐了吗？'},
{key:'renew',label:'续签准备',value:c.renew?pct(...c.renew):null,fact:c.renew?`准备清单完成 ${c.renew[0]} / ${c.renew[1]} 项`:'尚未进入90天续签准备窗口',question:'合同何时到期，续签准备好了吗？'},
{key:'follow',label:'催缴跟进',value:c.follow[1]?pct(...c.follow):null,fact:c.follow[1]?`跟进清单完成 ${c.follow[0]} / ${c.follow[1]} 项`:'当前无催缴任务，不适用',question:'需要催缴吗，下一步怎么做？'}]}
const money=n=>'¥'+Number(n).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});
const scopes={all:'全部授权项目',A:'项目A',B:'项目B'};
function answer(q,scope='all',context={}){
const s=summary(scope),cs=visible(scope).map(x=>contract(x.id));let kind='clarify';
if(/股价|股票|天气/.test(q))kind='clarify';
else if(/同比|环比|预测|去年|上月|本月|\d{1,2}月|202[0-5]/.test(q))kind='missing';
else if(/设备|电梯|消防/.test(q))kind='device';
else if(/多经|点位|广告|快递/.test(q))kind='point';
else if(/远景|恒瑞|海辰|企业|客商|客户/.test(q)&&!/多少家/.test(q))kind='enterprise';
else if(/欠|逾期|催缴|未缴|没缴|未收/.test(q))kind='overdue';
else if(/续签|到期/.test(q))kind='expiry';
else if(/空置|出租率|可租|资产|房源/.test(q)&&!/总览|概览/.test(q))kind='asset';
else if(/回款|应收|已收|实收|核销|收缴/.test(q))kind='payment';
else if(/整体|经营|总览|概览|多少份|多少家/.test(q))kind='overview';
else if(/按项目|展开|明细|为什么|继续|按企业/.test(q)&&context.kind)kind=context.kind;
const base={kind,scope,question:q,period:PERIOD,asof:ASOF,columns:[],rows:[],metrics:[],chart:[],evidence:[],followups:[]};
const metric=(label,value,unit='元')=>({label,value,unit});
const cr=(r,values)=>({id:r.id,values});
const byProject=field=>['A','B'].filter(p=>scope==='all'||scope===p).map(p=>({label:scopes[p],value:summary(p)[field]}));
if(kind==='missing')return{...base,title:'当前缺少所需期间的数据',text:'演示数据仅包含当前期间汇总快照，无法计算同比、环比、月度切片或未来预测。落地需补充完整历史账单、核销日期和统一比较口径。可以先查看当前回款、欠费或出租率。',followups:['当前整体经营概览','当前回款情况']};
if(kind==='clarify')return{...base,title:'请明确要分析的业务范围',text:'可以查询资产出租、客商关联合同、合同到期、应收核销、逾期催缴、设备台账或多经点位。请说明关注的指标、项目或企业。此演示按预设场景识别问题。',followups:['当前整体经营概览','哪些合同欠费需要催缴','资产出租率与空置情况']};
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
Object.assign(base,{customer:key,title:customers[key]+' · 关联合同分析',text:`在${scopes[scope]}范围，该客商关联 ${rs.length} 份合同，租金应收 ${money(ar)}，已核销 ${money(paid)}，回款率 ${pct(paid,ar)??'—'}%。仅汇总当前授权范围内的签约合同；租金、保证金和多经收入分别核算。`,metrics:[metric('应收',ar),metric('已核销',paid),metric('逾期未核销',sum(rs,'overdue')),metric('关联合同',rs.length,'份')],columns:['合同','项目 / 资源','应收（元）','已核销（元）','逾期（元）'],rows:rs.map(r=>cr(r,[r.id,scopes[r.project]+' / '+r.room,money(r.ar),money(r.paid),money(r.overdue)])),chart:rs.map(r=>({label:r.id,value:pct(r.paid,r.ar)})),chartTitle:'各合同回款率（%）',evidence:rs.map(r=>r.id+' · 签约客商ID '+key),followups:['哪些合同欠费需要催缴','90天内到期合同有哪些']});
}
if(kind==='device'){
const rs=devices.filter(x=>scope==='all'||x.project===scope);
Object.assign(base,{title:'设备台账分布',text:`授权范围内登记设备 ${sum(rs,'count')} 台。当前仅有设备类别与登记数量，可分析台账分布；故障率、维修及时率需补充工单和状态历史。`,metrics:[metric('登记设备',sum(rs,'count'),'台')],columns:['台账批次','项目','设备类型','数量（台）'],rows:rs.map(r=>({values:[r.id,scopes[r.project],r.name,r.count]})),evidence:rs.map(r=>r.id+' · 设备台账'),followups:['资产出租率与空置情况','当前整体经营概览']});
}
if(kind==='point'){
const rs=points.filter(x=>scope==='all'||x.project===scope);
Object.assign(base,{title:'多经点位收款分析',text:'多经点位采用独立点位账单口径，未合并到租金应收。当前可核对点位应收与已核销；点位归属项目以点位台账为准。',metrics:[metric('点位应收',sum(rs,'ar')),metric('点位已核销',sum(rs,'paid')),metric('点位未核销',sum(rs,'ar')-sum(rs,'paid'))],columns:['点位编号 / 名称','项目','应收（元）','已核销（元）'],rows:rs.map(r=>({values:[r.id+' / '+r.name,scopes[r.project],money(r.ar),money(r.paid)]})),evidence:rs.map(r=>r.id+' · 点位账单'),followups:['当前回款情况','当前整体经营概览']});
}
return base;
}
const SCENES=[
['C01','contract','履约总览','一线 / 管理者','这份合同目前有哪些需要处理的？','当前合同、账单、核销、保证金、期限、准备清单','锁定合同 → 拉取事实 → 计算指标 → 中台解释 → 结果卡','HT-A01显示逾期20,000元、保证金缺口10,000元、53天到期。','仅当前合同；缺失维度单列，不产出信用评级。'],
['C02','contract','应收与未缴','收费 / 财务','这份合同哪些账单还没交费？','账单ID、费用项、计费期、应收、到期日、核销分配','账单余额汇总 → 区分未到期/逾期 → 下钻明细','HT-A01仅B-A01-03欠20,000元；历史迟付已结清账单不算欠费。','作废账单排除；到账待分配不自动抵减。'],
['C03','contract','逾期催缴','一线 / 负责人','需要催缴吗？帮我写一份催缴内容','逾期账单、客户、负责人、已到账待分配、催缴记录','核账提示 → 选择账单 → 生成草稿 → 人工复核','草稿引用合同号、账单号及20,000元；提示先核对5,000元待分配到账。','原型仅本地草稿；实际发出走原业务确认流程。'],
['C04','contract','续签准备','招商 / 管理者','合同快到期了吗，续签准备得怎样？','结束日、90天阈值、续签意向、方案审批、协议状态','计算剩余天数 → 检查准备清单 → 形成待办建议','HT-A01剩余53天，准备完成1/3项。','准备进度不是续签概率，不自动延长合同。'],
['C05','contract','付款及时性','财务 / 管理者','历史付款是否及时？','账单到期日、核销分配、对应到账日期','按期分配金额统计 → 识别迟付 → 展示事实','HT-A01按期核销70,000元，已核销80,000元，迟付已结清10,000元。','按期核销/到期应收；补录时间不替代实际到账时间。'],
['C06','contract','保证金核验','财务 / 一线','保证金是否交齐？','保证金条款、应缴、有效到账、退还/抵扣记录','适用性判断 → 有效余额 → 缺口与来源','HT-A01缺口10,000元；HT-C01显示来源缺失。','保证金不混入租金回款；未知值不填0。'],
['C07','contract','到账待分配','财务','客户说已付款，为什么仍欠费？','收款流水、核销分配、到账日期、合同关联','区分到账与核销 → 展示差异 → 提示核对','HT-A01保留20,000元逾期，同时展示5,000元待分配。','需要财务正式核销后刷新，不自动修改账。'],
['C08','contract','跟进与复核','负责人 / 管理者','下一步谁负责？处理后风险消除了吗？','负责人、任务、跟进记录、业务快照','生成待办草稿 → 人工执行 → 更新源数据 → 重新分析','可查看本地草稿；任务完成不会直接将欠费归零。','业务指标只随有效源数据变化。'],
['Q01','ask','经营总览','管理者','当前整体经营情况如何？','资产、客商、合同、租金账单、核销','授权过滤 → 多域聚合 → 结论/指标/项目表','7合同、3客商、应收500,000元、核销452,000元。','每个指标明确口径与截至时间。'],
['Q02','ask','欠费催缴分布','一线 / 管理者','目前哪些合同欠费，需要催缴？','账单、核销、到期日、合同、客商、项目','余额过滤 → 合同/项目聚合 → 合同下钻','4份合同逾期48,000元；项目A 26,000元、B 22,000元。','授权项目内查询；零余额不进入催缴清单。'],
['Q03','ask','回款分析','财务 / 管理者','各项目回款情况怎么样？','应收账单、核销、项目归属','统一期间 → 项目分组 → 金额/回款率','项目A应收300,000元、核销274,000元、回款率91.33%。','不以银行流水总额替代已核销。'],
['Q04','ask','企业关联合同','招商 / 管理者','远景科技签了哪些合同，回款怎么样？','客商ID、签约关系、合同、账单、核销','主体消歧 → 关联合同 → 分合同对比/总计','全部范围远景3份合同，应收200,000元；项目B仅1份、20,000元。','同名需澄清；同合同多资源关联不得重复汇总。'],
['Q05','ask','到期统筹','招商 / 管理者','90天内哪些合同到期？','合同结束日、合同状态、负责人、准备清单','到期窗口过滤 → 按剩余天数排序 → 单合同跳转','固定日期下4份合同在90天内到期，2份在30天内。','到期日与续签状态分开展示。'],
['Q06','ask','资产出租与空置','招商 / 管理者','资产出租率多少，哪里空置？','可租资产、面积快照、有效租用关系','资产去重 → 可租/已租面积 → 项目/资产明细','可租10,000㎡，已租7,200㎡，出租率72%。','台账数量与面积出租率不混用。'],
['Q07','ask','设备台账','运营 / 管理者','各项目登记了多少设备？','设备ID、项目、类型、登记数量','授权过滤 → 类别/项目统计','项目A 6台、B 5台，共11台。','仅台账分布，故障/维修指标需要工单数据。'],
['Q08','ask','多经点位','多经 / 财务','多经点位应收和回款如何？','点位ID、项目、点位账单、核销','点位维度聚合 → 明细 → 租金口径隔离','点位应收12,000元、已核销11,000元、未核销1,000元。','本例点位账单未计入租金应收500,000元。'],
['Q09','ask','连续追问与会话回看','所有用户','按项目展开；查看上次查询结果','会话ID、上下文、授权范围、结果快照、时间','继承意图 → 补充维度 → 保存快照 → 回看','欠费问题后追问按项目分组仍为欠费分析；右侧点历史恢复原结果。','历史不自动更新；重新查询形成新快照。'],
['Q10','ask','数据不足与澄清','所有用户','今年收入同比增长多少？','指标目录、可用期间、数据覆盖','识别口径/来源缺失 → 说明缺口 → 建议替代问题','当前单期样例返回缺少去年同期，不生成增长率。','不支持问题需澄清，不展示伪造图表。']
].map(([id,agent,title,role,question,data,flow,accept,boundary])=>({id,agent,title,role,question,data,flow,accept,boundary}));
const api={ASOF,PERIOD,customers,contracts,bills,assets,devices,points,scopes,visible,contract,summary,radar,answer,SCENES,money,pct};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CoreModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
