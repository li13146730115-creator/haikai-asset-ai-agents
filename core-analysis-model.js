(function(root){
'use strict';
const M=typeof module!=='undefined'&&module.exports?require('./model'):root.CoreModel;
const validScope=scope=>{if(!Object.hasOwn(M.scopes,scope))throw new Error('无效数据范围');return scope};
function guarantee(c){const balance=c.deposit?.[0];if(!Number.isFinite(balance)||balance<0)return{status:'pending',balance:null,ratio:null,title:'欠租与保证金保障待核验',advice:'请财务核对有效保证金余额及抵扣、退还记录，再比较欠租；当前不认定达到处置阈值。'};const hit=c.overdue>0&&c.overdue>=balance;return{status:hit?'threshold':'covered',balance,ratio:balance>0?M.pct(c.overdue,balance):null,title:hit?'欠租已达到有效保证金余额':'当前欠租未达到有效保证金余额',advice:hit?'立即提交项目负责人核验生效条款及项目规则，评估补充保障、限期清缴或合同终止处置；须按审批流程确认，不自动终止合同。':'继续跟踪付款节点与有效保证金余额变化；保证金不直接冲抵租金。'}}
function riskCoupling(overdue,level){if(!Number.isInteger(level)||level<1||level>5)return{status:'pending',title:'外部风险待核验',text:overdue>0?'已识别欠租，企业信用与舆情来源待取得；先跟进收缴，取得有效事件后再判断是否加严处置。':'当前企业信用与舆情来源待取得，不能认定企业无风险。'};if(level>=4)return{status:overdue>0?'priority':'watch',title:overdue>0?'高等级外部风险与欠租叠加':'高等级外部风险需持续关注',text:overdue>0?'请项目负责人联合财务核实付款安排及有效事件，并由法务评估保障措施。':'继续跟踪付款及有效事件变化，当前无欠租不等于外部风险消除。'};return{status:overdue>0?'collection':'normal',title:overdue>0?'按欠租账龄跟进':'继续常规监测',text:overdue>0?'外部等级较低仍须按约收缴，不能据此免除或延后合同义务。':'保留来源与更新时间，按约跟踪后续付款。'}}
function decorated(c){const ages=c.bills.filter(b=>b.overdue>0).map(b=>Math.max(0,Math.round((Date.parse(M.ASOF)-Date.parse(b.due))/86400000))),g=guarantee(c),level=M.enterpriseRiskLevel(M.enterpriseProfiles[c.customer]),exp=c.days>=0&&c.days<=90;
const risk=c.overdue>0||g.status==='threshold'||(level!==null&&level>=4),pending=g.status==='pending'||level===null||!M.changeProfiles[c.id];
return{...c,guarantee:g,level,expiring:exp,maxAge:ages.length?Math.max(...ages):0,hasRisk:risk,pending,priority:g.status==='threshold'||(level>=4&&c.overdue>0)?'重点核验':c.overdue>0&&ages.some(n=>n>30)?'优先催缴':c.overdue>0?'催缴跟进':exp?'续租跟进':'例行跟踪'};}
function portfolio(scope='all',filter='all'){
validScope(scope);const contracts=M.visible(scope).map(c=>decorated(M.contract(c.id))),bs=contracts.flatMap(c=>c.bills).filter(b=>b.overdue>0),aging=[{label:'1—30天',min:1,max:30},{label:'31—90天',min:31,max:90},{label:'91—180天',min:91,max:180},{label:'180天以上',min:181,max:Infinity}].map(x=>{const items=bs.filter(b=>{const n=Math.round((Date.parse(M.ASOF)-Date.parse(b.due))/86400000);return n>=x.min&&n<=x.max});return{...x,amount:total(items,'overdue'),bills:items.length,contracts:new Set(items.map(b=>b.contract)).size}});
const projects=[...new Set(contracts.map(c=>c.project))].map(id=>{const xs=contracts.filter(c=>c.project===id);return{id,name:M.scopes[id],count:xs.length,overdue:total(xs,'overdue'),ar:total(xs,'ar'),paid:total(xs,'paid'),notDue:total(xs,'notDue'),expiry:xs.filter(c=>c.expiring).length}});
const tests={all:()=>true,overdue:c=>c.overdue>0,over30:c=>c.maxAge>30,expiry:c=>c.expiring,guarantee:c=>c.guarantee.status==='threshold',enterprise:c=>c.level!==null&&c.level>=4,pending:c=>c.pending,changes:c=>!M.changeProfiles[c.id]};if(!tests[filter])throw new Error('无效分析场景');
return{scope,filter,contracts,rows:contracts.filter(tests[filter]).sort((a,b)=>Number(b.guarantee.status==='threshold')-Number(a.guarantee.status==='threshold')||b.overdue-a.overdue||a.id.localeCompare(b.id)),customerCount:new Set(contracts.map(c=>c.customer)).size,ar:total(contracts,'ar'),paid:total(contracts,'paid'),overdue:total(contracts,'overdue'),notDue:total(contracts,'notDue'),riskCount:contracts.filter(c=>c.hasRisk).length,pendingCount:contracts.filter(c=>c.pending).length,verifiedClearCount:contracts.filter(c=>!c.hasRisk&&!c.pending).length,expiryCount:contracts.filter(c=>c.expiring).length,over30:contracts.filter(c=>c.maxAge>30).length,guaranteeCount:contracts.filter(c=>c.guarantee.status==='threshold').length,enterpriseCount:contracts.filter(c=>c.level!==null&&c.level>=4).length,aging,projects};}
function total(xs,key){return Math.round(xs.reduce((n,x)=>n+(Number(x[key])||0),0)*100)/100}
function customer(id,scope='all'){
validScope(scope);if(!Object.hasOwn(M.customers,id))throw new Error('无效客商');const contracts=portfolio(scope).contracts.filter(c=>c.customer===id),level=M.enterpriseRiskLevel(M.enterpriseProfiles[id]);return{id,name:M.customers[id],scope,contracts,denied:contracts.length===0,projectCount:new Set(contracts.map(c=>c.project)).size,ar:total(contracts,'ar'),paid:total(contracts,'paid'),overdue:total(contracts,'overdue'),notDue:total(contracts,'notDue'),expiryCount:contracts.filter(c=>c.expiring).length,riskCount:contracts.filter(c=>c.hasRisk).length,enterpriseLevel:level,historicalCount:null,historyStatus:'未取得完整历史合同及终止重签关系',firstKnownStart:contracts.map(c=>c.start).sort()[0]||null,coupling:riskCoupling(total(contracts,'overdue'),level)};}

// Comparison fields must be supplied explicitly; room numbers are not spatial master data.
function peerComparison(target,rows,threshold=20){
const keys=['building','floor','use','period','unit','tax'];
if(keys.some(k=>target[k]===null||target[k]===undefined||target[k]==='')||!Number.isFinite(target.price)||target.price<=0)return{status:'pending',peerCount:0,median:null,deviation:null,peers:[]};
const eligible=rows.filter(x=>x.id!==target.id&&x.customer!==target.customer&&x.customer&&Number.isFinite(x.price)&&x.price>0&&keys.every(k=>x[k]===target[k]));
// Each counterparty contributes one median, so multiple leases cannot inflate the sample.
const median=xs=>{const a=xs.slice().sort((a,b)=>a-b),i=Math.floor(a.length/2);return a.length%2?a[i]:(a[i-1]+a[i])/2};
const companies=[...new Set(eligible.map(x=>x.customer))],values=companies.map(id=>median(eligible.filter(x=>x.customer===id).map(x=>x.price)));
if(companies.length<3)return{status:'insufficient',peerCount:companies.length,median:null,deviation:null,peers:eligible};
const base=median(values),deviation=Math.round((target.price/base-1)*10000)/100;
return{status:Math.abs(deviation)>=threshold?'attention':'within',peerCount:companies.length,median:base,deviation,threshold,peers:eligible};
}
const MONITORS=[
{key:'new',scene:'P06',title:'今日新签与存量履约',question:'今天新签了哪些合同？这些企业以前有没有欠租？',object:'当日已签约/生效合同 → 同主体既有可见合同',rule:'按签约时间取当日新签，关联签约前已有合同；存量欠租>0，或首期/保证金未按约到位时提醒核验。',data:'签约时间及状态、主体ID、既有合同与账单、首期/保证金节点',action:'招商会同财务核对既有欠租与新签首期条件，形成责任人及付款节点；涉及准入限制时走项目审批。',missing:'当前未取得签约时间、签约状态及首期条件，无法识别今日新签；起租日、合同编号不能代替签约时间。'},
{key:'enterprise',scene:'P07',title:'同一企业多合同联动',question:'同一家企业在不同项目签的合同，欠租和到期是否集中？',object:'同一签约主体 → 当前权限内的多份合同/项目',rule:'按统一主体聚合且合同去重；名下任一合同欠租时联看其他合同，识别欠租与到期叠加。',data:'客商主键、全部可见合同、项目、账单、到期日、有效保障余额',action:'指定客商经办统一沟通，各项目分别核账及匹配催缴规则；临期合同同步确认续租或退租，不跨合同自动冲抵保证金。',missing:'一企仅1份可见合同不进入多合同比较；无法判断权限外合同。'},
{key:'floor',scene:'P08',title:'同楼层不同企业对比',question:'同一层其他企业租金和收缴怎么样？这份合同为什么差异大？',object:'同楼栋+楼层+用途，不同签约主体；统一租金单位、税口径和比较期间',rule:'剔除本企业，以至少3家可比企业的主体中位价形成基线；单价偏离≥20%提示核验，并列示收缴情况。样本不足不扩到其他楼层。',data:'楼栋/楼层主数据、用途、计租面积、当期净租金单价、税/周期、免租及优惠审批、账单',action:'核实面积、租期、免租、装修交付及审批原因；差异合理则记录依据，缺少审批则转负责人核验。欠租单独按账龄处理。',missing:'缺少楼栋/楼层、用途及当期可比租金口径；不能从房号推断楼层，不能用全周期应收/面积代替租金单价。'},
{key:'renewal',scene:'P09',title:'续签与变更条件对比',question:'这次续签或补充协议，租金和付款条件比原合同变了什么？',object:'有明确原新关联的续签合同 / 同合同生效版本',rule:'统一租金周期及税口径后比较单价、租期、免租、付款周期与保证金；本方案以单价下调≥10%或付款周期延长提示复核。',data:'原新合同关联、版本/生效日、租金计划、付款条款、优惠/变更审批',action:'招商列出逐项变化和审批依据，财务核对生效账单是否同步；补充协议与终止重签分开追溯。',missing:'未取得原新合同关系及完整生效条款/版本，当前无法比较续签或变更幅度。'},
{key:'trend',scene:'P10',title:'收缴恶化与重复逾期',question:'哪些企业以前正常，最近连续拖欠，值得提前跟进？',object:'同一企业名下合同，连续且完整的可比已到期账期',rule:'至少3个完整月度快照；连续3期逾期余额上升且首期>0、末期较首期增长≥20%，标记趋势关注。按期收缴率另取实际到账日核验。',data:'历史账单状态、到账分配/日期、月末余额快照、调账及减免记录',action:'核实最近到账、减免和回款承诺，约定分合同付款安排；与外部事件联动时由负责人评估加严跟踪。',missing:'当前只有单时点账单快照，无法判断逾期恶化或曾经正常；不把本期0实收推断为历史信用差。'}
];
function monitoring(scope='all',key='enterprise',mode='actual'){
validScope(scope);const spec=MONITORS.find(x=>x.key===key);if(!spec)throw new Error('无效监控场景');if(!['actual','sample'].includes(mode))throw new Error('无效样例模式');
const base={...spec,sample:mode==='sample',scope,asof:M.ASOF,status:'pending',groups:[],rows:[],comparison:null};
if(mode==='actual'){
if(key!=='enterprise')return{...base,summary:spec.missing};
const cs=portfolio(scope).contracts,groups=[...new Set(cs.map(c=>c.customer))].map(id=>{const xs=cs.filter(c=>c.customer===id);return{id,name:M.customers[id],contracts:xs,overdue:total(xs,'overdue'),expiry:xs.filter(c=>c.expiring).length,projects:new Set(xs.map(c=>c.project)).size}}).filter(x=>x.contracts.length>1);
return{...base,groups,status:groups.some(x=>x.overdue>0)?'attention':'no-match',summary:groups.length?`${groups.length}家客商存在多份可见合同；分别展示合并欠租、合同到期及分合同核验入口。`:'当前范围未发现一企多份可见合同，不能据此判断其他项目或权限外合同。'};
}
if(key==='floor'){
const common={building:'演示楼A',floor:'5',use:'办公',period:'2026-11',unit:'元/㎡/月',tax:'含税'},rows=[35,50,52,54].map((price,i)=>({...common,id:'DEMO-0'+(i+1),customer:'示例主体'+i,name:['演示企业甲','演示企业乙','演示企业丙','演示企业丁'][i],price,overdue:i===0?74000:0})),comparison=peerComparison(rows[0],rows);
return{...base,rows,comparison,status:comparison.status,summary:`演示企业甲当期单价35元/㎡/月，可比3家企业中位价52元/㎡/月，偏离${comparison.deviation}%；仅提示核验差异原因，不能直接认定低价违规。`};
}
const samples={new:{summary:'演示企业甲在2026-11-11新签DEMO-NEW-01；同主体既有DEMO-OLD-01尚欠租74,000元。建议核对存量清缴安排与新签首期条件。',rows:[['2026-11-11','DEMO-NEW-01','演示企业甲','存量欠租 ¥74,000.00','首期条件待经办确认']]},enterprise:{summary:'演示企业甲的2份合同分属2个项目，合计欠租74,000元，其中1份30天内到期，需统一沟通、分别落实处理。',rows:[['演示企业甲','DEMO-OLD-01 / DEMO-NEW-01','2个演示项目','¥74,000.00','1份30天内到期']]},renewal:{summary:'演示续签合同的含税月单价从52降至45元/㎡，下降13.46%；付款周期从季付延长为半年付，优惠审批依据待核验。',rows:[['含税月单价','52元/㎡/月','45元/㎡/月','下降13.46%'],['付款周期','季付','半年付','周期延长']]},trend:{summary:'演示企业甲连续3个完整月末的逾期余额为2万、4万、7.4万元，连续上升，末期较首期增长270%；提示核账与收缴跟踪。',rows:[['2026-08-31','¥20,000.00','完整月末快照'],['2026-09-30','¥40,000.00','完整月末快照'],['2026-10-31','¥74,000.00','完整月末快照']]}};
return{...base,...samples[key],status:'attention'};
}
function customerAxes(id,scope='all',mode='actual'){
const c=customer(id,scope);if(c.denied)throw new Error('当前范围无可见合同');const cs=c.contracts,maxAge=Math.max(...cs.map(x=>x.maxAge)),minDays=Math.min(...cs.map(x=>x.days)),gs=cs.map(x=>x.guarantee);
const axes=[
{key:'payment',label:'租金收缴',level:c.overdue>0?(maxAge>90?5:maxAge>30?4:3):1,fact:`${cs.length}份合同逾期未缴${M.money(c.overdue)}，最长逾期${maxAge}天。`,rule:'欠租=0为1级；欠租且最长逾期1—30天为3级、31—90天为4级、>90天为5级。',advice:'客商经办联合财务逐份核账，按各项目生效规则及逐笔账龄准备催缴渠道和话术；登记付款承诺及复核日期。',source:'当前客商可见合同及租金账单'},
{key:'guarantee',label:'保证金保障',level:gs.some(x=>x.status==='threshold')?5:gs.every(x=>x.status==='covered')?1:null,fact:gs.some(x=>x.status==='threshold')?'存在合同欠租达到有效保证金余额。':'未取得名下每份合同完整有效保证金余额，当前无法判断保障是否充足。',rule:'逐合同欠租≥有效余额且欠租>0为5级；全部完整且未达阈值为1级；缺少来源为待核验。',advice:'财务逐合同核对保证金到账、抵扣、退还及生效条款；达到阈值时按项目规则提请补充保障或处置评估，按审批执行。',source:'保证金有效余额、抵扣/退还记录及项目条款待补'},
{key:'expiry',label:'到期衔接',level:minDays<0?5:minDays<=30?5:minDays<=60?4:minDays<=90?3:1,fact:`${c.expiryCount}份合同90天内到期，最近一份距到期${minDays}天；续租/退租进展未取得。`,rule:'最近到期>90天为1级，61—90天为3级，31—60天为4级，≤30天或到期未确认闭环为5级；这是节点提醒。',advice:c.expiryCount?'经办在3个工作日内逐份确认续租/退租意向，招商准备审批材料；财务同步核清欠租、保证金和结算安排。':'继续跟踪合同到期窗口，取得续租/退租节点后安排经办跟进。',source:'合同到期日；续租意向与办理进度待补'},
{key:'credit',label:'企业信用',level:c.enterpriseLevel,fact:'未取得可核验企业等级、事件及来源时间；不依据欠租反推外部信用。',rule:'直接使用经授权且有效的来源等级1—5级；缺失不赋值。',advice:'补齐主体统一标识，通过中台复用有效企业信用来源；核实事件有效性。确认高等级风险并叠加欠租时，由负责人联合财务/法务评估。',source:'统一中台企业信用来源未取得'},
{key:'opinion',label:'舆情关注',level:null,fact:'未取得舆情事件与覆盖范围；未接入不等于无负面舆情。',rule:'使用经核验且按项目规则映射的1—5级事件等级；未接入、无匹配及已核验无事件分开表达。',advice:'经办通过中台复用AI招商有效缓存，核对主体、事件日期和原始出处；确认事件后再关联名下合同，避免重复付费查询。',source:'AI招商 / 统一中台舆情来源未取得'},
{key:'changes',label:'合同变更',level:null,fact:'完整生效变更、原新合同关系及审批依据未取得。',rule:'依项目变更分级规则核查租金、付款条件、免租与保障；不能仅按变更次数评级。',advice:'招商补齐生效补充协议及续签原新关联，逐项比较租金、付款周期、优惠和保障；财务核对变更后账单一致性。',source:'生效版本、补充协议与审批数据待补'}];
if(mode==='sample')return axes.map((a,i)=>({...a,level:[4,3,4,2,3,2][i],fact:'匿名图形结构样例，不代表当前客商。',source:'独立展示样例'}));
if(mode!=='actual')throw new Error('无效雷达模式');return axes;
}

const SCENES=[
{id:'P01',agent:'portfolio',title:'整体履约总览',role:'管理者 / 项目负责人',question:'我负责的所有合同目前履约情况怎么样？',data:'授权项目、合同状态、租金账单、收款分配、保证金与风险来源覆盖',flow:'权限范围锁定 → 唯一合同汇总 → 已识别风险与待核验分开 → 优先级清单下钻',accept:'全范围5合同4客商，已识别风险5份，待核验5份；两项可重叠，不相加。',boundary:'当前演示仅5份快照；未发现风险且来源不齐不能认定无风险。'},
{id:'P02',agent:'portfolio',title:'欠租分布与账龄催缴',role:'财务 / 收费经办',question:'哪些合同欠租最需要先处理？分别怎么催？',data:'账单应收日、余额、项目催缴规则、已执行催收记录',flow:'逐笔账龄 → 项目分布 → 合同优先级 → 单笔阶段/渠道及话术草稿',accept:'各账龄余额之和为7,634,438.08元；按合同欠租降序，单合同不重复统计。',boundary:'账龄匹配建议不证明已完成催告；话术不自动发送。'},
{id:'P03',agent:'portfolio',title:'临期与欠租叠加',role:'招商 / 项目负责人',question:'哪些合同快到期，同时还欠租？',data:'合同到期日、待收余额、续租意向与审批进度',flow:'90天窗口 → 欠租交叉核验 → 续租或退租待办',accept:'城华2份合同距快照50天，欠租合计5,084,703.68元；意向显示待确认。',boundary:'到期提醒不是已认定违约；不生成续租概率。'},
{id:'P04',agent:'portfolio',title:'欠款与保证金阈值',role:'财务 / 管理者',question:'哪些合同欠款已经达到保证金？',data:'逾期租金、有效保证金余额、退还/抵扣、项目生效规则',flow:'可比口径校验 → 欠款≥有效保证金 → 负责人核验及处置评估',accept:'当前5合同保障数据不足，显示待核验；单元案例100元欠款/100元有效余额命中。',boundary:'未取得余额不按0计算；合同终止须依条款、规则和审批。'},
{id:'P05',agent:'portfolio',title:'外部风险与履约联动',role:'风控 / 管理者',question:'有企业信用风险的客户，名下合同还欠租吗？',data:'统一主体标识、有效企业等级、舆情、关联合同及欠租',flow:'主体核验 → 有效事件 → 关联全部可见合同 → 叠加风险与建议',accept:'当前外部来源未取得，显示待核验；不虚构高风险客户数量。',boundary:'1—5级不与金额混合成信用分；无舆情不代表无风险。'},

{id:'P06',agent:'portfolio',title:'今日新签与存量履约',role:'招商 / 财务 / 管理者',question:MONITORS[0].question,data:MONITORS[0].data,flow:'签约时间与状态 → 同主体存量合同 → 首期/欠租交叉核验 → 跟进建议',accept:'真实快照签约时间缺失时不出今日新签数量；匿名样例识别新签主体存量欠租74,000元。',boundary:MONITORS[0].missing},
{id:'P07',agent:'portfolio',title:'同一企业多合同联动',role:'客商经办 / 项目负责人',question:MONITORS[1].question,data:MONITORS[1].data,flow:'先权限过滤 → 同主体合同去重 → 欠租/临期叠加 → 客商与合同下钻',accept:'全范围城华2份合同欠租5,084,703.68元，2份临期；仅配套商业项目时不构成多合同比较。',boundary:'仅当前签约主体，不自动扩大到关联集团；不跨合同冲抵保证金。'},
{id:'P08',agent:'portfolio',title:'同楼层不同企业对比',role:'招商 / 经营管理者',question:MONITORS[2].question,data:MONITORS[2].data,flow:'楼栋/楼层/用途及价格口径校验 → 至少3家其他主体 → 中位基线 → 偏离及原因核验',accept:'匿名样例35对52，偏离-32.69%；剔除同企业及不同用途，少于3家不出比较结论。',boundary:'20%为演示阈值待项目确认；差异不直接认定违规，房号不作为楼层依据。'},
{id:'P09',agent:'portfolio',title:'续签与变更条件对比',role:'招商 / 财务',question:MONITORS[3].question,data:MONITORS[3].data,flow:'原新/版本关系 → 相同口径比较 → 审批与账单一致性 → 经办核查',accept:'匿名样例52降为45，下降13.46%；季付变半年付，提示核验审批。真实来源缺失显示待核验。',boundary:'10%为方案演示阈值；未审批不能由AI直接认定违法或撤销合同。'},
{id:'P10',agent:'portfolio',title:'收缴恶化与重复逾期',role:'财务 / 项目负责人',question:MONITORS[4].question,data:MONITORS[4].data,flow:'3个完整可比月末快照 → 连续上升及增长≥20% → 到账/减免核验 → 跟进清单',accept:'匿名2万→4万→7.4万，增长270%；单时点快照不生成趋势或历史信用结论。',boundary:'增长口径排除首期0；20%为演示阈值；金额增加需同时核查新增应收及调账。'},
{id:'K05',agent:'customer',title:'客商六维风险雷达',role:'客商经办 / 管理者',question:'这家客商哪些维度最需要关注，分别应该怎么处理？',data:'名下合同账单、有效保证金、到期进展、企业信用、舆情、生效变更及各来源时间',flow:'主体/权限锁定 → 六维独立等级 → 雷达缺失留空 → 具体问题和建议 → 数据/合同下钻',accept:'城华租金收缴5级、到期衔接4级，4维待核验；样例切换不修改真实建议或金额。',boundary:'1级最低5级最高，各维独立不合成信用分；内部预警分档为拟定口径，待项目确认。'},
{id:'K01',agent:'customer',title:'客商合作与履约画像',role:'招商 / 客户经办',question:'这家客商签了哪些合同，整体履约怎么样？',data:'客商主键、可见合同、资源/面积、账单及收款',flow:'锁定客商 → 过滤授权项目 → 分合同与主体汇总 → 合同详情',accept:'北京城华2合同2项目，欠租5,084,703.68元；其他客商不混入。',boundary:'不把一企多合同重复计为多家企业。'},
{id:'K02',agent:'customer',title:'三类风险统一分析',role:'项目负责人 / 风控',question:'企业信用、舆情和合同履约有哪些需要关注？',data:'企查查类来源、AI招商舆情、名下合同、各来源时间与覆盖',flow:'统一主体 → 三源独立核验 → 关联解读 → 最终跟进建议',accept:'信用、舆情待核验；合同欠租有真实金额；不能把欠租充当企业外部等级。',boundary:'舆情无匹配、未接入、过期分别表达；不凭推断给真实企业负面事件。'},
{id:'K03',agent:'customer',title:'历史合作与重签',role:'招商 / 管理者',question:'这家客商历次合作、续租和付款表现怎么样？',data:'全部历史/终止合同、原新合同关联、补充协议、历史到账日',flow:'合作链还原 → 同时多合同/历史重签区分 → 历史与当前履约',accept:'展示现有2份合同时间轴，历史覆盖未取得；不推断完整合作年限或续签次数。',boundary:'终止重签不视为原合同变更，缺失历史不填0。'},
{id:'K04',agent:'customer',title:'周期与异常触发监测',role:'管理者 / 客商经办',question:'客商什么时候重新监测？会不会重复查询外部数据？',data:'客商新增事件、合同履约异常、监测任务、缓存/外部刷新记录',flow:'月度巡检 + 新增客商/履约异常触发 → 复用有效缓存 → 必要时外部刷新 → 留存来源',accept:'重新分析仅复用现有快照；外部更新入口说明未接入，不伪装已查询/已启动任务。',boundary:'频率、缓存TTL和异常去重窗口为拟定配置；生产需确认。'}];
const api={portfolio,customer,guarantee,riskCoupling,peerComparison,monitoring,customerAxes,MONITORS,SCENES};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AnalysisModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
