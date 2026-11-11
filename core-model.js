(function(root){
'use strict';
const fixture={
  "asof": "2026-11-11",
  "customers": {
    "A": "北京乐于竞网络科技有限公司",
    "B": "北京城华房地产开发有限公司",
    "C": "北京天拓斯特科技有限公司",
    "D": "清超卓影（北京）医疗科技有限公司"
  },
  "contracts": [
    {
      "id": "BJGK-20251000601",
      "customer": "A",
      "project": "A",
      "area": 921,
      "start": "2026-01-01",
      "end": "2027-12-31",
      "room": "503",
      "asset": "A-503",
      "owner": "合同经办（待接口映射）",
      "deposit": null,
      "renew": null,
      "follow": null,
      "status": "履约中"
    },
    {
      "id": "BJGK-20251200704",
      "customer": "B",
      "project": "B",
      "area": 341.94,
      "start": "2026-01-01",
      "end": "2026-12-31",
      "room": "1007",
      "asset": "B-1007",
      "owner": "合同经办（待接口映射）",
      "deposit": null,
      "renew": null,
      "follow": null,
      "status": "履约中"
    },
    {
      "id": "BJGK-20251200705",
      "customer": "B",
      "project": "A",
      "area": 2639.79,
      "start": "2026-01-01",
      "end": "2026-12-31",
      "room": "801",
      "asset": "A-801",
      "owner": "合同经办（待接口映射）",
      "deposit": null,
      "renew": null,
      "follow": null,
      "status": "履约中"
    },
    {
      "id": "BJGK-20250800439",
      "customer": "C",
      "project": "A",
      "area": 361,
      "start": "2025-11-16",
      "end": "2027-11-15",
      "room": "305",
      "asset": "A-305",
      "owner": "合同经办（待接口映射）",
      "deposit": null,
      "renew": null,
      "follow": null,
      "status": "履约中"
    },
    {
      "id": "BJGK-20251000602",
      "customer": "D",
      "project": "A",
      "area": 810,
      "start": "2026-01-01",
      "end": "2027-12-31",
      "room": "403",
      "asset": "A-403",
      "owner": "合同经办（待接口映射）",
      "deposit": null,
      "renew": null,
      "follow": null,
      "status": "履约中"
    }
  ],
  "bills": [
    {
      "id": "BJGK-20251000601 · 租金 · 2026-01-01",
      "contract": "BJGK-20251000601",
      "ar": 265248,
      "paid": 0,
      "balance": 265248,
      "due": "2026-01-01",
      "period": "2026-01-01 至 2026-03-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 租金 · 2026-04-01",
      "contract": "BJGK-20251000601",
      "ar": 268195.2,
      "paid": 0,
      "balance": 268195.2,
      "due": "2026-04-01",
      "period": "2026-04-01 至 2026-06-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 租金 · 2026-07-01",
      "contract": "BJGK-20251000601",
      "ar": 271142.4,
      "paid": 0,
      "balance": 271142.4,
      "due": "2026-07-01",
      "period": "2026-07-01 至 2026-09-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 租金 · 2026-10-01",
      "contract": "BJGK-20251000601",
      "ar": 271142.4,
      "paid": 0,
      "balance": 271142.4,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-12-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 租金 · 2027-01-01",
      "contract": "BJGK-20251000601",
      "ar": 265248,
      "paid": 0,
      "balance": 265248,
      "due": "2027-01-01",
      "period": "2027-01-01 至 2027-03-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 租金 · 2027-04-01",
      "contract": "BJGK-20251000601",
      "ar": 268195.2,
      "paid": 0,
      "balance": 268195.2,
      "due": "2027-04-01",
      "period": "2027-04-01 至 2027-06-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 租金 · 2027-07-01",
      "contract": "BJGK-20251000601",
      "ar": 271142.4,
      "paid": 0,
      "balance": 271142.4,
      "due": "2027-07-01",
      "period": "2027-07-01 至 2027-09-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 租金 · 2027-10-01",
      "contract": "BJGK-20251000601",
      "ar": 271142.4,
      "paid": 0,
      "balance": 271142.4,
      "due": "2027-10-01",
      "period": "2027-10-01 至 2027-12-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200704 · 租金 · 2026-01-01",
      "contract": "BJGK-20251200704",
      "ar": 184647.6,
      "paid": 0,
      "balance": 184647.6,
      "due": "2026-01-01",
      "period": "2026-01-01 至 2026-03-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200704 · 租金 · 2026-04-01",
      "contract": "BJGK-20251200704",
      "ar": 186699.24,
      "paid": 0,
      "balance": 186699.24,
      "due": "2026-04-01",
      "period": "2026-04-01 至 2026-06-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200704 · 租金 · 2026-07-01",
      "contract": "BJGK-20251200704",
      "ar": 188750.88,
      "paid": 0,
      "balance": 188750.88,
      "due": "2026-07-01",
      "period": "2026-07-01 至 2026-09-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200704 · 租金 · 2026-10-01",
      "contract": "BJGK-20251200704",
      "ar": 188750.88,
      "paid": 0,
      "balance": 188750.88,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-12-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200705 · 租金 · 2026-01-01",
      "contract": "BJGK-20251200705",
      "ar": 1069114.95,
      "paid": 0,
      "balance": 1069114.95,
      "due": "2026-01-01",
      "period": "2026-01-01 至 2026-03-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200705 · 租金 · 2026-04-01",
      "contract": "BJGK-20251200705",
      "ar": 1080994.01,
      "paid": 0,
      "balance": 1080994.01,
      "due": "2026-04-01",
      "period": "2026-04-01 至 2026-06-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200705 · 租金 · 2026-07-01",
      "contract": "BJGK-20251200705",
      "ar": 1092873.06,
      "paid": 0,
      "balance": 1092873.06,
      "due": "2026-07-01",
      "period": "2026-07-01 至 2026-09-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200705 · 租金 · 2026-10-01",
      "contract": "BJGK-20251200705",
      "ar": 1092873.06,
      "paid": 0,
      "balance": 1092873.06,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-12-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2025-11-16",
      "contract": "BJGK-20250800439",
      "ar": 106278.4,
      "paid": 0,
      "balance": 106278.4,
      "due": "2025-11-01",
      "period": "2025-11-16 至 2026-02-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2026-02-16",
      "contract": "BJGK-20250800439",
      "ar": 102812.8,
      "paid": 0,
      "balance": 102812.8,
      "due": "2026-02-01",
      "period": "2026-02-16 至 2026-05-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2026-05-16",
      "contract": "BJGK-20250800439",
      "ar": 106278.4,
      "paid": 0,
      "balance": 106278.4,
      "due": "2026-05-01",
      "period": "2026-05-16 至 2026-08-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2026-08-16",
      "contract": "BJGK-20250800439",
      "ar": 106278.4,
      "paid": 0,
      "balance": 106278.4,
      "due": "2026-08-01",
      "period": "2026-08-16 至 2026-11-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2026-11-16",
      "contract": "BJGK-20250800439",
      "ar": 106278.4,
      "paid": 0,
      "balance": 106278.4,
      "due": "2026-11-01",
      "period": "2026-11-16 至 2027-02-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2027-02-16",
      "contract": "BJGK-20250800439",
      "ar": 102812.8,
      "paid": 0,
      "balance": 102812.8,
      "due": "2027-02-01",
      "period": "2027-02-16 至 2027-05-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2027-05-16",
      "contract": "BJGK-20250800439",
      "ar": 106278.4,
      "paid": 0,
      "balance": 106278.4,
      "due": "2027-05-01",
      "period": "2027-05-16 至 2027-08-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 租金 · 2027-08-16",
      "contract": "BJGK-20250800439",
      "ar": 106278.4,
      "paid": 0,
      "balance": 106278.4,
      "due": "2027-08-01",
      "period": "2027-08-16 至 2027-11-15",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2026-01-01",
      "contract": "BJGK-20251000602",
      "ar": 233280,
      "paid": 0,
      "balance": 233280,
      "due": "2026-01-01",
      "period": "2026-01-01 至 2026-03-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2026-04-01",
      "contract": "BJGK-20251000602",
      "ar": 235872,
      "paid": 0,
      "balance": 235872,
      "due": "2026-04-01",
      "period": "2026-04-01 至 2026-06-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2026-07-01",
      "contract": "BJGK-20251000602",
      "ar": 238464,
      "paid": 0,
      "balance": 238464,
      "due": "2026-07-01",
      "period": "2026-07-01 至 2026-09-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2026-10-01",
      "contract": "BJGK-20251000602",
      "ar": 238464,
      "paid": 0,
      "balance": 238464,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-12-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2027-01-01",
      "contract": "BJGK-20251000602",
      "ar": 233280,
      "paid": 0,
      "balance": 233280,
      "due": "2027-01-01",
      "period": "2027-01-01 至 2027-03-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2027-04-01",
      "contract": "BJGK-20251000602",
      "ar": 235872,
      "paid": 0,
      "balance": 235872,
      "due": "2027-04-01",
      "period": "2027-04-01 至 2027-06-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2027-07-01",
      "contract": "BJGK-20251000602",
      "ar": 238464,
      "paid": 0,
      "balance": 238464,
      "due": "2027-07-01",
      "period": "2027-07-01 至 2027-09-30",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 租金 · 2027-10-01",
      "contract": "BJGK-20251000602",
      "ar": 238464,
      "paid": 0,
      "balance": 238464,
      "due": "2027-10-01",
      "period": "2027-10-01 至 2027-12-31",
      "fee": "租金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    }
  ],
  "depositBills": [
    {
      "id": "BJGK-20251000601 · 保证金 · 2026-09-01",
      "contract": "BJGK-20251000601",
      "ar": 268932,
      "paid": 0,
      "balance": 268932,
      "due": "2026-09-01",
      "period": "2026-09-01 至 2026-09-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 保证金 · 2026-10-01",
      "contract": "BJGK-20251000601",
      "ar": 268932,
      "paid": 0,
      "balance": 268932,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-10-31",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000601 · 保证金 · 2026-11-01",
      "contract": "BJGK-20251000601",
      "ar": 268932,
      "paid": 0,
      "balance": 268932,
      "due": "2026-11-01",
      "period": "2026-11-01 至 2026-11-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200705 · 保证金 · 2026-09-01",
      "contract": "BJGK-20251200705",
      "ar": 1271175.93,
      "paid": 0,
      "balance": 1271175.93,
      "due": "2026-09-01",
      "period": "2026-09-01 至 2026-09-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200705 · 保证金 · 2026-10-01",
      "contract": "BJGK-20251200705",
      "ar": 1271175.93,
      "paid": 0,
      "balance": 1271175.93,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-10-31",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251200705 · 保证金 · 2026-11-01",
      "contract": "BJGK-20251200705",
      "ar": 1271175.93,
      "paid": 0,
      "balance": 1271175.93,
      "due": "2026-11-01",
      "period": "2026-11-01 至 2026-11-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 保证金 · 2026-09-01",
      "contract": "BJGK-20250800439",
      "ar": 105411.99,
      "paid": 0,
      "balance": 105411.99,
      "due": "2026-09-01",
      "period": "2026-09-01 至 2026-09-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 保证金 · 2026-10-01",
      "contract": "BJGK-20250800439",
      "ar": 105411.99,
      "paid": 0,
      "balance": 105411.99,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-10-31",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20250800439 · 保证金 · 2026-11-01",
      "contract": "BJGK-20250800439",
      "ar": 105411.99,
      "paid": 0,
      "balance": 105411.99,
      "due": "2026-11-01",
      "period": "2026-11-01 至 2026-11-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 保证金 · 2026-09-01",
      "contract": "BJGK-20251000602",
      "ar": 236520,
      "paid": 0,
      "balance": 236520,
      "due": "2026-09-01",
      "period": "2026-09-01 至 2026-09-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 保证金 · 2026-10-01",
      "contract": "BJGK-20251000602",
      "ar": 236520,
      "paid": 0,
      "balance": 236520,
      "due": "2026-10-01",
      "period": "2026-10-01 至 2026-10-31",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    },
    {
      "id": "BJGK-20251000602 · 保证金 · 2026-11-01",
      "contract": "BJGK-20251000602",
      "ar": 236520,
      "paid": 0,
      "balance": 236520,
      "due": "2026-11-01",
      "period": "2026-11-01 至 2026-11-30",
      "fee": "保证金",
      "timely": null,
      "source": "测试系统账单管理页面",
      "sourceId": null
    }
  ]
};
const SCENES=[{"id":"C01","agent":"contract","title":"履约总览","role":"一线 / 管理者","question":"这份合同目前有哪些需要处理的？","data":"当前合同、账单、核销、保证金、企业信息、变更、项目规则","flow":"单合同事实 → 独立问题清单 → 项目规则查询 → 建议事项","accept":"默认合同催缴示例仅展示原第1、2、4项：超30天汇总、第一季度、第三季度；另列企业风险、合同变更、保证金核验。所有问题默认收起，全量账单与金额不受筛选影响。","boundary":"仅当前合同；缺失维度单列，不产出信用评级。"},{"id":"C02","agent":"contract","title":"应收与未缴","role":"收费 / 财务","question":"这份合同哪些账单还没交费？","data":"账单ID、费用项、计费期、应收、到期日、核销分配","flow":"账单余额汇总 → 区分未到期/逾期 → 下钻明细","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"作废账单排除；到账待分配不自动抵减。"},{"id":"C03","agent":"contract","title":"逾期催缴","role":"一线 / 负责人","question":"需要催缴吗？帮我写一份催缴内容","data":"逾期账单、客户、负责人、已到账待分配、催缴记录","flow":"核账提示 → 选择账单 → 生成草稿 → 人工复核","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"原型仅本地草稿；实际发出走原业务确认流程。"},{"id":"C04","agent":"contract","title":"续签准备","role":"招商 / 管理者","question":"合同快到期了吗，续签准备得怎样？","data":"结束日、90天阈值、续签意向、方案审批、协议状态","flow":"计算剩余天数 → 检查准备清单 → 形成待办建议","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"准备进度不是续签概率，不自动延长合同。"},{"id":"C05","agent":"contract","title":"付款及时性","role":"财务 / 管理者","question":"历史付款是否及时？","data":"账单到期日、核销分配、对应到账日期","flow":"按期分配金额统计 → 识别迟付 → 展示事实","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"按期核销/到期应收；补录时间不替代实际到账时间。"},{"id":"C06","agent":"contract","title":"保证金核验","role":"财务 / 一线","question":"保证金是否交齐？","data":"保证金条款、应缴、有效到账、退还/抵扣记录","flow":"适用性判断 → 有效余额 → 缺口与来源","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"保证金不混入租金回款；未知值不填0。"},{"id":"C07","agent":"contract","title":"到账待分配","role":"财务","question":"客户说已付款，为什么仍欠费？","data":"收款流水、核销分配、到账日期、合同关联","flow":"区分到账与核销 → 展示差异 → 提示核对","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"需要财务正式核销后刷新，不自动修改账。"},{"id":"C08","agent":"contract","title":"企业风险与合同变更","role":"负责人 / 管理者","question":"企业是否有经营风险，合同变更是否频繁？","data":"统一主体标识、外部风险事件、当前合同版本与生效变更","flow":"主体匹配 → 已授权有效风险等级/事件核验 → 取1—5级最高等级 → 单独核验变更与账单一致性","accept":"有效等级仅允许整数1—5；多条有效来源取最高级，1级最低5级最高；缺失等级显示待核验，企业风险不展示分值。","boundary":"当前未取得外部风险及变更接口，显示待核验，不生成虚构异常。"},{"id":"Q01","agent":"ask","title":"经营总览","role":"管理者","question":"目前合同履约和租金收缴情况怎么样？","data":"资产、客商、合同、租金账单、核销","flow":"授权过滤 → 多域聚合 → 结论/指标/项目表","accept":"显示5份合同、4家客户；租金应收9,971,615.68元=已收0元+逾期7,634,438.08元+未到期2,337,177.60元；给出重点欠租与临期跟进。","boundary":"每个指标明确口径与截至时间。"},{"id":"Q02","agent":"ask","title":"客户欠租与催缴跟进","role":"一线 / 管理者","question":"哪些客户还欠租金？","data":"账单、核销、到期日、合同、客商、项目","flow":"授权与客户范围 → 账单逾期余额 → 按客户去重汇总 → 按欠租降序展示","accept":"客户欠租返回4家客户及各自欠租合同数、金额、最长逾期；指定北京城华时仅返回该客户2份合同，逾期合计5,084,703.68元。","boundary":"授权项目内查询；零余额不进入催缴清单。"},{"id":"Q03","agent":"ask","title":"项目租金收缴","role":"财务 / 管理者","question":"各项目租金收缴情况怎么样？","data":"应收账单、核销、项目归属","flow":"统一账单口径 → 按项目汇总应收/已收/逾期/未到期 → 重点跟进","accept":"返回2条项目汇总；配套商业应收748,848.60元；项目合计与总览一致。","boundary":"应收含全周期已出账，保证金单列；无完整当期范围时不展示易混淆收缴率。"},{"id":"Q04","agent":"ask","title":"客户合同与欠租","role":"招商 / 管理者","question":"北京城华房地产开发有限公司签了几份合同，还欠多少租金？","data":"客商ID、签约关系、合同、账单、核销","flow":"主体消歧 → 关联合同 → 分合同对比/总计","accept":"只返回北京城华的2份合同，欠租5,084,703.68元；不能返回其他客户欠费。","boundary":"同名需澄清；同合同多资源关联不得重复汇总。"},{"id":"Q05","agent":"ask","title":"临期合同与续租跟进","role":"招商 / 管理者","question":"最近90天有哪些合同要到期，续租该怎么跟进？","data":"合同结束日、合同状态、负责人、准备清单","flow":"到期窗口过滤 → 按剩余天数排序 → 单合同跳转","accept":"返回北京城华2份合同，2026-12-31到期、距快照50天；续租意向显示待确认并给出联系客户、核欠及续租/退租建议。","boundary":"到期日与续签状态分开展示。"},{"id":"Q06","agent":"ask","title":"资产出租与空置","role":"招商 / 管理者","question":"资产出租率多少，哪里空置？","data":"可租资产、面积快照、有效租用关系","flow":"资产去重 → 可租/已租面积 → 项目/资产明细","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"当前仅载入合同占用资源；未取得完整可租资产，不能计算出租率。"},{"id":"Q09","agent":"ask","title":"连续追问与会话回看","role":"所有用户","question":"该客户欠租按合同列出来；查看上次查询结果","data":"会话ID、上下文、授权范围、结果快照、时间","flow":"继承意图 → 补充维度 → 保存快照 → 回看","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"历史不自动更新；重新查询形成新快照。"},{"id":"Q10","agent":"ask","title":"数据不足与澄清","role":"所有用户","question":"今年收入同比增长多少？","data":"指标目录、可用期间、数据覆盖","flow":"识别口径/来源缺失 → 说明缺口 → 建议替代问题","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"不支持问题需澄清，不展示伪造图表。"},{"id":"Q11","agent":"ask","title":"授权与空结果","role":"业务 / 管理者","question":"未授权项目回款情况；逾期超过1亿元的合同","data":"服务端授权范围、指标查询状态、筛选条件","flow":"先鉴权 → 有权再查询 → 区分拒绝/空结果/来源缺失","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"页面不提供授权项目选择器；生产权限必须在服务端执行。"},{"id":"Q12","agent":"ask","title":"年底待收租金","role":"财务 / 管理者","question":"年底前还有多少租金要收回来？","data":"已到期账单、年底前已生成未到期账单、核销分配","flow":"区分到期状态 → 计算计划余额 → 账单下钻","accept":"仅统计年底前已生成且仍有余额的租金账单；分别列出已逾期、未到期、合计，合计7,634,438.08元，不输出回款预测。","boundary":"账单计划不等于实际回款预测，未生成账单不纳入。"}];
const ASOF=fixture.asof,PERIOD='已载入合同的租金账单全周期（含未到期账单）';
const {customers,contracts}=fixture,scopes={all:'当前载入的5份合同',A:'海开园1号楼',B:'海开园配套商业'};
const days=end=>Math.round((Date.parse(end)-Date.parse(ASOF))/86400000),sum=(xs,k)=>Math.round(xs.reduce((n,x)=>n+(x[k]||0),0)*100)/100,pct=(n,d)=>d?Math.round(n/d*10000)/100:null,money=n=>n===null||n===undefined?'—':'¥'+Number(n).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});
const bills=fixture.bills.map(b=>({...b,overdue:b.due<ASOF?b.balance:0})),depositBills=fixture.depositBills;
const assets=contracts.map(c=>({id:c.asset,project:c.project,name:c.room,type:'合同关联资源',area:c.area,leased:c.area}));
const enterpriseProfiles=Object.fromEntries(Object.keys(customers).map(k=>[k,null])),changeProfiles=Object.fromEntries(contracts.map(c=>[c.id,null])),projectPolicies={A:null,B:null},scheduledBills=[];
function visible(scope){return contracts.filter(c=>scope==='all'||c.project===scope)}
function contract(id){const c=contracts.find(c=>c.id===id);if(!c)throw Error('合同不存在');const bs=bills.filter(b=>b.contract===id);return {...c,name:customers[c.customer],bills:bs,ar:sum(bs,'ar'),paid:sum(bs,'paid'),overdue:sum(bs,'overdue'),notDue:sum(bs.filter(b=>b.due>=ASOF),'balance'),balance:sum(bs,'balance'),timely:null,latePaid:null,days:days(c.end),unallocated:null}}
function summary(scope){const cs=visible(scope).map(c=>contract(c.id)),ar=sum(cs,'ar'),paid=sum(cs,'paid');return {ar,paid,balance:sum(cs,'balance'),overdue:sum(cs,'overdue'),notDue:sum(cs,'notDue'),contracts:cs.length,customers:new Set(cs.map(c=>c.customer)).size,assets:cs.length,area:sum(cs,'area'),leased:sum(cs,'area'),occupancy:null,rate:pct(paid,ar),expiring:cs.filter(c=>c.days>=0&&c.days<=90).length}}
function collectionAdvice(input,override){const c=typeof input==='string'?contract(input):input,p=override===undefined?projectPolicies[c.project]:override,age=Math.max(0,...c.bills.filter(b=>b.overdue>0).map(b=>-days(b.due))),stage=p?.stages?.find(s=>age<=s.maxDays);return {configured:!!stage,policy:stage?p.id:null,age,stage:stage?.name||'核账并确认付款计划',source:stage?'项目规则 · '+p.id+' · '+p.version:'AI参考建议 · 当前未取得项目规则配置',action:stage?.action||'先核对账单与收款凭证，确认未缴原因；由合同经办与客户约定付款计划，升级处置需负责人审批。',evidence:stage?.evidence||'保留对账记录、付款凭证、沟通纪要与客户回复。'}}
function riskSignals(input){const c=typeof input==='string'?contract(input):input,rs=[];if(c.overdue>0)rs.push({code:'overdue',label:'逾期未缴',tone:'red',detail:`${c.bills.filter(b=>b.overdue>0).length}笔租金账单逾期未缴，合计 ${money(c.overdue)}。`,evidence:c.bills.filter(b=>b.overdue>0).map(b=>b.id),question:'哪些账单逾期未缴？',action:'billlist'});if(c.days>=0&&c.days<=90)rs.push({code:'renewal',label:'合同即将到期',tone:'amber',detail:`${c.end}到期，剩余${c.days}天；续签办理状态尚未取得。`,evidence:[c.id+' · 合同结束日期'],question:'合同何时到期？',action:'renew'});return rs}
function enterpriseRiskLevel(profile){if(!profile)return null;const levels=[profile.riskLevel,...(profile.events||[]).filter(x=>x.active!==false&&!['disabled','inactive','expired'].includes(x.status)&&(!x.effectiveFrom||x.effectiveFrom<=ASOF)&&(!x.effectiveTo||x.effectiveTo>=ASOF)).map(x=>x.riskLevel)].filter(x=>Number.isInteger(x)&&x>=1&&x<=5);return levels.length?Math.max(...levels):null}
function radar(id){const c=contract(id);return [{key:'payment',label:'回款完成',value:pct(c.paid,c.ar),unit:'%',fact:`租金已收 ${money(c.paid)} / 全周期已生成租金应收 ${money(c.ar)}`,formula:'租金已收 / 已载入租金应收 ×100%；含未到期账单',question:'还有哪些账单没交费？'},{key:'timely',label:'付款及时',value:null,unit:'%',fact:'未取得付款实际到账日，无法判断及时性',formula:'需真实到账日、应收日及有效收款对应关系；不以未取得替代0',question:'历史付款是否及时？'},{key:'deposit',label:'保证金到位',value:null,unit:'%',fact:'已取得部分保证金账单，但未取得完整应缴条款及有效保障余额',formula:'完整有效保证金 / 生效应缴；不能用单条账单替代保障余额',question:'保证金交齐了吗？'},{key:'enterprise',label:'企业风险',value:enterpriseRiskLevel(enterpriseProfiles[c.customer]),unit:'级',max:5,direction:'ascending',fact:enterpriseRiskLevel(enterpriseProfiles[c.customer])===null?'未取得已授权企业风险等级，待核验':'按已授权来源的有效风险等级展示',formula:'1级最低、5级最高；采用已核验主体风险等级及有效事件等级的最高级，不换算分值；无有效等级显示待核验',question:'企业风险如何？'},{key:'stability',label:'合同变更',value:null,unit:'分',fact:'未取得完整生效变更及版本记录',formula:'仅统计当前合同生效变更，重签不算变更；当前不评分',question:'合同变更是否频繁？'}]}
// Demonstration policy configuration: not obtained from the customer's policy service.
const demoEscalationPolicies=Object.fromEntries(['A','B'].map(project=>[project,{id:'DEMO-'+project+'-RENT-30',project,name:scopes[project]+'租金逾期催缴升级规则（演示）',version:'1.0',status:'active',effectiveFrom:'2026-01-01',effectiveTo:'2026-12-31',thresholdDays:30,deadlines:{verify:1,notice:2,reply:3,review:5},demo:true}]));
function overdueEscalation(input,policies=demoEscalationPolicies){const c=typeof input==='string'?contract(input):input,bs=c.bills.filter(b=>b.balance>0&&-days(b.due)>30);if(!bs.length)return null;const p=policies[c.project],rule=p&&p.project===c.project&&p.status==='active'&&p.effectiveFrom<=ASOF&&p.effectiveTo>=ASOF&&p.thresholdDays===30?p:null,amount=sum(bs,'balance'),maxAge=Math.max(...bs.map(b=>-days(b.due)));return {key:'overdue-30',escalation:true,title:'租金逾期超过30天，需升级催缴',status:'需升级处理',amount,bills:bs,rule,fact:`${bs.length}笔租金账单 · 逾期超过30天未缴 ${money(amount)} · 最长逾期${maxAge}天`,analysis:'逐笔按应收日计算，筛选逾期天数>30且待缴余额>0的租金账单；本项汇总上述账单的处理要求，金额不与单笔问题重复累加。',advice:rule?`按${scopes[c.project]}逾期催缴升级规则执行：1. 由${c.owner}在${rule.deadlines.verify}个工作日内会同财务核对这${bs.length}笔账单、到账凭证与待分配收款，确认待催缴金额${money(amount)}；2. 核账确认后${rule.deadlines.notice}个工作日内提交项目负责人复核并形成书面催缴通知，经确认后通过原业务流程发出；3. 通知后${rule.deadlines.reply}个工作日内联系客户取得明确付款日期或分期计划，并登记催缴台账；4. ${rule.deadlines.review}个工作日内复查到账，仍未履约则提交项目负责人审议后续处置。保留账单、核账结果、通知送达记录与客户回复。`:`由${c.owner}先与财务核对${money(amount)}欠费并联系客户确认付款计划；将逾期超过30天的情况提报项目负责人，登记书面催缴与回访待办。`,source:rule?'演示项目规则 · '+rule.id+' · V'+rule.version:'AI参考建议 · 当前未取得适用项目规则',action:'billlist',label:'查看逾期账单',ruleType:'overdue_escalation'};}
const collectionStageDefinitions=[
 {key:'friendly',id:'STAGE_FRIENDLY',name:'友好提醒',minDays:1,maxDays:30,severity:'一般',channels:['电话','短信','邮件'],evidence:['沟通纪要','短信截图','邮件记录'],approval:false,roles:['合同经办'],notifyChannels:['站内通知'],action:'核对账单及到账记录后，电话友好提醒客户，随后通过短信或邮件发送本期对账信息；请客户在3个工作日内反馈预计付款日期，保留沟通记录。',request:'请协助核对本期租金并反馈预计付款日期；如已付款，请提供凭证以便核账。'},
 {key:'formal',id:'STAGE_FORMAL',name:'正式催告',minDays:31,maxDays:90,severity:'重要',channels:['邮件','书面通知/EMS','电话','短信'],evidence:['邮件记录','EMS回执','书面付款承诺','通话纪要'],approval:true,roles:['项目负责人','财务'],notifyChannels:['站内通知','邮件'],action:'1个工作日内完成财务核账，2个工作日内提交项目负责人复核书面催缴内容；确认后使用邮件及书面通知/EMS催告，并电话跟进，请客户在3个工作日内提供付款日期或书面分期计划，5个工作日内回访并更新催缴台账。',request:'请在收到通知后3个工作日内反馈明确付款日期或书面分期计划，便于双方落实本期欠费处理。'},
 {key:'legal',id:'STAGE_LEGAL',name:'律师函',minDays:91,maxDays:180,severity:'紧急',channels:['邮件','书面通知/EMS','电话'],evidence:['生效合同及补充协议','账单与核账记录','前序催告送达记录','客户回复及书面承诺','律师函及送达凭证（实施后补充）'],approval:true,roles:['项目负责人','法务'],notifyChannels:['站内通知','邮件'],action:'整理本期合同条款、账单、前序催告与送达证据，在2个工作日内提交项目负责人及法务评估律师函适用条件；证据或前序阶段记录不足先补齐。律师函经法务审定和审批后由授权人员按确认方式送达；经办继续通过邮件、电话核实付款方案并登记送达与回复。',request:'本期欠费已持续较长时间，请尽快书面反馈付款安排；我们将提交项目负责人及法务评估后续处理。'},
 {key:'litigation',id:'STAGE_LITIGATION',name:'诉讼/仲裁',minDays:181,maxDays:null,severity:'紧急',channels:['邮件','书面通知/EMS'],evidence:['完整合同与争议解决条款','欠费计算表与核账记录','前序催告及送达记录','履约及违约证据','内部审批与法务意见'],approval:true,roles:['项目负责人','法务','管理者'],notifyChannels:['站内通知','邮件'],action:'由经办汇总本期长期欠费金额、履约证据、前序沟通与送达材料，在2个工作日内提交项目负责人及法务开展诉讼/仲裁可行性评估；核验合同争议解决条款、前序处置及内部授权。是否起诉或仲裁须完成专项审批，由法务确认程序与材料；客户沟通继续通过经确认的邮件或书面通知留痕。',request:'请尽快书面确认本期欠费处理方案；我们拟提交内部审批及法务评估后续争议解决安排，具体以双方沟通及正式文件为准。'}
];
const collectionPolicies=Object.fromEntries(['A','B'].map(project=>[project,{id:'DEMO-'+project+'-COLLECTION',project,version:'2.0',status:'active',effectiveFrom:'2026-01-01',effectiveTo:'2026-12-31',demo:true,stages:collectionStageDefinitions.map(x=>({...x,ruleId:'STAGE_'+project+'_'+x.key.toUpperCase(),logic:'AND',priority:x.minDays,enabled:true})),arrearsLevels:collectionStageDefinitions.map(x=>({id:'ARREARS_'+project+'_'+x.key.toUpperCase(),name:x.severity,minDays:x.minDays,maxDays:x.maxDays,severity:x.severity,enabled:true}))}]));
function collectionPlan(input,bill,policies=collectionPolicies){const c=typeof input==='string'?contract(input):input,age=-days(bill.due);if(bill.balance<=0||age<=0)return null;const p=policies[c.project],valid=p&&p.project===c.project&&p.status==='active'&&p.effectiveFrom<=ASOF&&p.effectiveTo>=ASOF,stage=valid?p.stages.find(x=>x.enabled&&age>=x.minDays&&(x.maxDays===null||age<=x.maxDays)):collectionStageDefinitions.find(x=>age>=x.minDays&&(x.maxDays===null||age<=x.maxDays));if(!stage)return null;return {age,stage,channels:stage.channels,templateChannels:['legal','litigation'].includes(stage.key)?['法务审阅稿',...stage.channels]:stage.channels,rule:valid?p:null,level:valid?p.arrearsLevels.find(x=>x.enabled&&age>=x.minDays&&(x.maxDays===null||age<=x.maxDays)):null,source:valid?(p.demo?'演示项目规则':'项目规则')+' · '+p.id+' · V'+p.version+' · '+stage.ruleId:'AI参考建议 · 未取得适用项目规则',advice:`本笔逾期${age}天，待缴${money(bill.balance)}，建议阶段：${stage.name}${['legal','litigation'].includes(stage.key)?'（待法务评估）':''}。由${c.owner}牵头：${stage.action}`,actualStage:'当前实际催收阶段及前序证据尚未取得，以上为按账龄给出的建议阶段。'};}
function collectionTemplate(input,billId,channel){const c=typeof input==='string'?contract(input):input,bill=c.bills.find(b=>b.id===billId);if(!bill)throw Error('账单不属于当前合同');const plan=collectionPlan(c,bill);if(!plan)throw Error('该账单无需催缴');channel=channel||plan.templateChannels[0];if(!plan.templateChannels.includes(channel))throw Error('渠道不适用于当前建议阶段');const legal=['legal','litigation'].includes(plan.stage.key),title=channel==='法务审阅稿'?plan.stage.name+'评估材料（内部审阅）':plan.stage.name+' · '+channel+'话术',fact=`合同${c.id}（${scopes[c.project]}，${c.room}）下，${bill.period}租金，应收日${bill.due}；截至${ASOF}逾期${plan.age}天，本笔待缴${money(bill.balance)}。`,check='如已支付或金额存在异议，请提供付款凭证或对账说明，财务核对后更新账单状态。',request=plan.stage.request;let text='';
if(channel==='法务审阅稿')text=`【内部审阅材料，未形成或发出律师函/法律文书】\n评估事项：${plan.stage.name}可行性\n签约客户：${c.name}\n事实摘要：${fact}\n拟请法务核验：${plan.stage.evidence.join('、')}。\n当前缺口：实际催收阶段、前序送达、授权及审批结果尚未取得，请补齐后评估。\n拟沟通要点：${request}\n不得将本材料表述为已发函、已起诉或已受理。`;
else if(channel==='电话')text=`【电话沟通话术 · ${plan.stage.name}】\n您好，请问是${c.name}的合同/财务负责人吗？我是${scopes[c.project]}合同经办。\n本次联系核对以下账单：${fact}\n${request}\n${check}\n结束前确认：付款日期、经办联系人及是否需要补充对账资料；通话后登记纪要。`;
else if(channel==='短信')text=`【${scopes[c.project]}租金提醒】${c.name}：合同${c.id}，${bill.period}租金待缴${money(bill.balance)}，已逾期${plan.age}天（截至${ASOF}）。${request}${check} 联系人：${c.owner}。`;
else text=`主题：${scopes[c.project]}租金${plan.stage.key==='friendly'?'对账提醒':'催缴沟通'}（${c.id} / ${bill.period}）\n\n${c.name}：\n您好！关于双方合同，现核对本期款项如下：\n${fact}\n\n${request}\n${check}\n\n请回复本通知以便我们登记付款安排。\n联系人：${c.owner}\n数据截至：${ASOF}\n${channel==='书面通知/EMS'?'送达对象、地址及送达方式须由经办核验，留存送达凭证。':''}`;
return {bill,plan,channel,title,text:text+'\n\n【草稿待核账'+(plan.stage.approval?'、待审批':'')+'，未发送】',review:legal?'法律阶段仅生成内部评估/沟通草稿，法律文书由法务审定。':plan.stage.approval?'正式催告内容需项目负责人复核后发送。':'发送前核验客户联系人及账单金额。'};}
function contractReport(id){const c=contract(id),ad=collectionAdvice(c),issues=[];for(const b of c.bills.filter(b=>b.overdue>0)){const plan=collectionPlan(c,b);issues.push({key:'bill-'+b.due,title:`${b.period}租金逾期未缴`,status:'待跟进',fact:`${money(b.balance)} · 应收日 ${b.due} · 逾期 ${-days(b.due)} 天`,analysis:'依据测试系统当前账单待收余额列出。请复核收款凭证、减免及账单状态后确定催缴金额。',collection:plan,advice:plan?plan.advice:ad.configured?ad.action+' '+ad.evidence:`由${c.owner}在1个工作日内与财务核对本笔${money(b.balance)}租金及到账凭证；确认仍未缴后联系客户，发送本期对账及催缴草稿，约定3个工作日内反馈付款日期。未按约付款时提报项目负责人复核后续处理，保留对账单、客户回复和付款计划。`,source:plan?.source||ad.source,rule:plan?.rule,action:'bill',value:b.id,label:'查看该笔账单',bill:b,ruleType:'collection'});}if(c.days>=0&&c.days<=90)issues.push({key:'expiry',title:`合同将于${c.end}到期`,status:'待确认安排',fact:`剩余${c.days}天；续签意向、审批和新合同状态未取得。`,analysis:'到期时间来自真实合同台账，不推断续签意向或成功概率。',advice:`由${c.owner}在3个工作日内联系客户确认续签或退出意向；续签时同步核清欠费与保证金，提交租赁方案审批，审批通过后在${c.end}前完成协议签署；退出时登记交还时间并安排验收及结算。`,source:'AI参考建议 · 当前未取得到期管理项目规则',action:'renew',label:'查看到期信息',ruleType:'expiry'});
const escalation=overdueEscalation(c);if(escalation){escalation.groups=collectionStageDefinitions.map(stage=>({stage,items:escalation.bills.map(b=>({bill:b,plan:collectionPlan(c,b)})).filter(x=>x.plan?.stage.key===stage.key)})).filter(g=>g.items.length);escalation.advice='按各账单账龄分别处理：'+escalation.groups.map(g=>g.stage.name+' '+g.items.length+'笔（'+money(sum(g.items.map(x=>x.bill),'balance'))+'），'+g.stage.action).join('；');issues.unshift(escalation);}
const axes=radar(id),blocks=[{key:'enterprise',title:'企业风险数据待核验',fact:'未取得外部风险来源',analysis:'不输出真实客户的虚构经营异常或司法风险',advice:'接入已授权企业风险接口并核对主体标识',source:'来源未取得',action:'enterprise'},{key:'stability',title:'合同变更记录待核验',fact:'未取得完整变更记录',analysis:'不将未取得解释为零次变更',advice:'复用合同版本与生效变更接口',source:'来源未取得',action:'changes'}];return {issues,blocks,axes,advice:ad,expiry:null,good:axes.filter(a=>a.key!=='enterprise'&&a.value>=90&&a.value!==null).length,attention:axes.filter(a=>a.key!=='enterprise'&&a.value>=60&&a.value<90).length,risk:axes.filter(a=>a.key!=='enterprise'&&a.value!==null&&a.value<60).length,missing:axes.filter(a=>a.value===null).length}}
function contractExamples(id){const c=contract(id),r=contractReport(id),collection=r.issues.filter(x=>x.escalation||x.bill),selected=collection.filter((x,i)=>[0,1,3].includes(i));
const checks=[{key:'enterprise-check',pending:true,badge:'企业风险待核验',title:'签约企业风险信息待核验',fact:`${c.name}：未取得已授权企业风险等级及事件。`,analysis:'当前不能认定企业存在经营异常或司法风险；本项为资料核验事项，不计入已识别履约风险。',advice:`由${c.owner}在2个工作日内核对签约主体名称与统一社会信用代码，向已授权企业风险来源查询经营异常、失信被执行及重大司法事件；对命中事件核实日期、有效性及与履约的关联，提交项目负责人评估是否加强收缴跟进或保障措施，并留存来源及核验结论。`,source:'AI参考建议 · 企业风险来源待取得',action:'enterprise',label:'查看企业风险依据'},
{key:'change-check',pending:true,badge:'合同变更待核验',title:'合同变更与账单一致性待核验',fact:'未取得完整生效变更及其对应调账记录。',analysis:'尚不能判断是否存在租金、面积、付款周期变更后账单未同步的情况。',advice:`由${c.owner}在2个工作日内核对当前生效合同及补充协议，逐项比对租金标准、计租面积、免租期与付款周期；若发现差异，提交财务按已生效条款复核并依原流程调账，调账完成后重新分析。`,source:'AI参考建议 · 生效变更记录待取得',action:'changes',label:'查看合同变更记录'}];
return [...selected,...r.issues.filter(x=>!x.escalation&&!x.bill),...checks];}
function answer(q,scope='all',context={}){
const projectKeys=['A','B'].filter(p=>q.includes(scopes[p])),resolved=projectKeys.length===1?projectKeys[0]:context.scope||scope;
const base={scope:resolved,question:q,asof:ASOF,period:PERIOD,columns:[],rows:[],metrics:[],chart:[],evidence:[],followups:['哪些客户还欠租金？','最近90天有哪些合同要到期？']};
const blank=(kind,title,text)=>({...base,kind,title,text});
if(/未授权项目|新城中心|无权限项目/.test(q)||projectKeys.some(p=>scope!=='all'&&p!==scope))return blank('denied','当前无此项目的查询授权','您暂时没有该项目的查询权限，请联系项目管理员确认授权后重试。');
if(/设备|多经|点位|电梯|消防/.test(q))return blank('unsupported','该业务暂未纳入当前问数','目前可查询合同、签约客户和租金收缴情况。');
if(/同比|环比|本月|上月|去年|预测/.test(q))return blank('missing','当前缺少可比期间数据','缺少完整可比期间数据，暂时无法可靠计算增幅。可以先查看现有租金收缴情况，补齐同期账单与收款后再分析。');
if(/超过\s*(1亿|10000万|100000000)/.test(q))return {...blank('empty','当前范围无符合条件的合同','查询完成：本次数据范围内，没有租金逾期未缴超过1亿元的合同。可调整金额条件继续查询。'),evidence:['合同台账与租金账单 · '+ASOF]};
const namedCustomer=Object.keys(customers).find(k=>q.includes(customers[k])||q.includes(({A:'乐于竞',B:'城华',C:'天拓',D:'清超'})[k]));
const followup=/展开|继续|明细|这些|该客户|这家/.test(q),customer=namedCustomer||(followup?context.customer:null);
let kind=/年底|年末|待回收/.test(q)?'yearend':/到期|续签|续租/.test(q)?'expiry':/欠|逾期|催缴|未缴|未收/.test(q)?'overdue':/空置|资产|出租率/.test(q)?'asset':/企业风险|经营异常|司法/.test(q)?'enterpriseRisk':/合同规模|多少份|多少家|几份|几家|多少合同/.test(q)?'contracts':/整体|概览|总览|合同履约/.test(q)?'overview':/回款|应收|已收|核销|收缴|收租/.test(q)?'payment':customer||/客户|企业|客商/.test(q)?'enterprise':/整体|概览|总览|经营/.test(q)?'overview':followup||/按项目/.test(q)?context.kind||'clarify':'clarify';
let cs=visible(resolved).map(c=>contract(c.id));if(customer)cs=cs.filter(c=>c.customer===customer);
const label=customer?customers[customer]:(resolved==='all'?'本次查询范围':scopes[resolved]),metric=(label,value,unit='元')=>({label,value,unit}),stats=rs=>[metric('租金应收（全周期）',sum(rs,'ar')),metric('租金已收',sum(rs,'paid')),metric('逾期未缴',sum(rs,'overdue')),metric('未到期待缴',sum(rs,'notDue'))];
const row=c=>({id:c.id,values:[c.id+' / '+c.name,scopes[c.project],money(c.ar),money(c.paid),money(c.overdue),money(c.notDue)]});
let a={...base,kind,customer,title:'',text:'',insights:[]},rs=cs;
if(kind==='clarify')return blank(kind,'您想了解哪方面经营情况？','例如：各项目租金收了多少、哪些客户还欠租金、最近有哪些合同要续租。');
if(kind==='asset')return {...blank('missing','暂时无法计算整体出租率',`本次可核对的合同签约面积为${sum(cs,'area')}㎡，尚缺完整可租资产面积及出租状态，无法据此计算整体出租率。`),followups:['目前有多少份在履约合同、多少家客户？','各项目租金收缴情况怎么样？']};
if(kind==='enterpriseRisk')return blank('missing','企业风险信息待核验','当前没有已授权的企业风险等级及事件数据，无法认定客户存在经营异常或司法风险。请核验签约主体及风险来源后再分析。');
if(kind==='expiry'){
const match=q.match(/(\d+)天/),window=match?Math.min(Number(match[1]),3650):90;
rs=cs.filter(c=>c.days>=0&&c.days<=window).sort((x,y)=>x.days-y.days);a.title=`未来${window}天到期与续租跟进清单`;a.columns=['合同 / 客户','项目','到期日','距到期','逾期未缴','续租跟进'];a.rows=rs.map(c=>({id:c.id,values:[c.id+' / '+c.name,scopes[c.project],c.end,c.days+'天',money(c.overdue),'待确认续租或退租意向']}));a.metrics=[metric('临期合同',rs.length,'份'),metric('涉及客户',new Set(rs.map(c=>c.customer)).size,'家'),metric('临期合同欠租',sum(rs,'overdue'))];a.text=`${label}有${rs.length}份合同将在未来${window}天到期，涉及${new Set(rs.map(c=>c.customer)).size}家客户。续租意向和审批进度尚待经办确认。`;a.insights.push(rs.length?`请经办在3个工作日内联系客户确认续租或退租意向，并同步核清${money(sum(rs,'overdue'))}欠租及保证金；到期前完成续租签署或退租结算。`:'本次范围内没有临期合同，可调整天数查看。');
}else if(kind==='yearend'){
const bs=bills.filter(b=>cs.some(c=>c.id===b.contract)&&b.due<='2026-12-31'&&b.balance>0),over=sum(bs.filter(b=>b.due<ASOF),'balance'),future=sum(bs.filter(b=>b.due>=ASOF),'balance');a.title='年底前待收租金清单';a.metrics=[metric('当前逾期未缴',over),metric('年底前未到期待缴',future),metric('年底前待收合计',sum(bs,'balance'))];a.text=`截至${ASOF}，${label}年底前待收租金${money(sum(bs,'balance'))}，其中已逾期${money(over)}、尚未到期${money(future)}。`;a.columns=['合同 / 客户','账期','应收日','待收租金'];a.rows=bs.map(b=>({id:b.contract,values:[b.contract+' / '+contract(b.contract).name,b.period,b.due,money(b.balance)]}));a.insights.push('请优先跟进已逾期租金，未到期账单按约定付款节点提醒；待收金额依据已生成账单，不包含尚未出账的未来收入预测。');
}else if(kind==='contracts'){
a.title='在履约合同与客户情况';a.metrics=[metric('在履约合同',cs.length,'份'),metric('签约客户',new Set(cs.map(c=>c.customer)).size,'家'),metric('90天内到期',cs.filter(c=>c.days>=0&&c.days<=90).length,'份')];a.columns=['合同 / 客户','项目','起租日','到期日','签约面积','合同状态'];a.rows=cs.map(c=>({id:c.id,values:[c.id+' / '+c.name,scopes[c.project],c.start,c.end,c.area+'㎡',c.status]}));a.text=`${label}共有${cs.length}份在履约合同、${new Set(cs.map(c=>c.customer)).size}家签约客户，其中${cs.filter(c=>c.days>=0&&c.days<=90).length}份合同在90天内到期。`;a.insights.push('同一客户签署多份合同时，合同逐份统计，客户按签约主体去重；可继续查看临期合同及欠租情况。');
}else if(kind==='payment'&&!customer){
a.title='各项目租金收缴情况';a.metrics=stats(cs);a.columns=['项目','合同数','租金应收（全周期）','租金已收','逾期未缴','未到期待缴'];a.rows=[...new Set(cs.map(c=>c.project))].map(p=>{const xs=cs.filter(c=>c.project===p);return{values:[scopes[p],xs.length+'份',money(sum(xs,'ar')),money(sum(xs,'paid')),money(sum(xs,'overdue')),money(sum(xs,'notDue'))]}});a.text=`${label}租金已收${money(sum(cs,'paid'))}、逾期未缴${money(sum(cs,'overdue'))}；以下按项目汇总，便于安排收缴跟进。`;
}else{
if(kind==='overdue')rs=cs.filter(c=>c.overdue>0).sort((x,y)=>y.overdue-x.overdue);
a.title=kind==='overdue'?(customer?customers[customer]+'欠租明细':'客户欠租与催缴清单'):customer?customers[customer]+'合同与租金情况':'合同与租金经营概览';
a.metrics=stats(rs);a.text=`${label}涉及${rs.length}份合同、${new Set(rs.map(c=>c.customer)).size}家客户，租金已收${money(sum(rs,'paid'))}，逾期未缴${money(sum(rs,'overdue'))}。`;
if(kind==='overdue'&&!customer&&/客户|企业|客商/.test(q)){
a.columns=['签约客户','欠租合同数','逾期未缴','最长逾期'];a.rows=[...new Set(rs.map(c=>c.customer))].map(k=>{const xs=rs.filter(c=>c.customer===k),ages=xs.flatMap(c=>c.bills.filter(b=>b.overdue>0).map(b=>-days(b.due)));return{values:[customers[k],xs.length+'份',money(sum(xs,'overdue')),Math.max(...ages)+'天']}}).sort((x,y)=>Number(y.values[2].replace(/[^\d.]/g,''))-Number(x.values[2].replace(/[^\d.]/g,'')));
}else{a.columns=['合同 / 客户','项目','租金应收（全周期）','租金已收','逾期未缴','未到期待缴'];a.rows=rs.map(row);}}
if(['overview','overdue','payment','enterprise'].includes(kind)){
const owing=rs.filter(c=>c.overdue>0).sort((x,y)=>y.overdue-x.overdue),top=owing[0];a.insights.push(top?`优先关注${top.name}的${top.id}，欠租${money(top.overdue)}。请经办先与财务核对到账及减免，再按各笔账单逾期时长匹配项目催缴规则并跟进付款安排。`:'本次范围没有逾期未缴租金，可继续关注后续付款节点。');
const exp=rs.filter(c=>c.days>=0&&c.days<=90);if(exp.length)a.insights.push(`${exp.length}份合同将在90天内到期，请同步确认客户续租意向，避免欠租与到期结算集中处理。`);}
a.insights.push(`本次演示数据覆盖4家真实客户、5份合同；当前结果范围为${label}，数据截至${ASOF}。租金应收按全周期已生成账单统计，包含未到期；应收=已收+逾期未缴+未到期待缴，保证金单独核算。`);a.evidence=rs.map(c=>c.id+' · 测试系统合同台账/账单管理 · '+ASOF);return a;
}
const api={ASOF,PERIOD,customers,contracts,bills,depositBills,assets,scopes,visible,contract,summary,riskSignals,radar,answer,enterpriseProfiles,changeProfiles,projectPolicies,scheduledBills,collectionAdvice,collectionPlan,collectionTemplate,collectionPolicies,collectionStageDefinitions,overdueEscalation,demoEscalationPolicies,contractReport,contractExamples,enterpriseRiskLevel,SCENES,money,pct};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CoreModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
