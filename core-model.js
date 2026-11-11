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
const SCENES=[{"id":"C01","agent":"contract","title":"履约总览","role":"一线 / 管理者","question":"这份合同目前有哪些需要处理的？","data":"当前合同、账单、核销、保证金、企业信息、变更、项目规则","flow":"单合同事实 → 独立问题清单 → 项目规则查询 → 建议事项","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"仅当前合同；缺失维度单列，不产出信用评级。"},{"id":"C02","agent":"contract","title":"应收与未缴","role":"收费 / 财务","question":"这份合同哪些账单还没交费？","data":"账单ID、费用项、计费期、应收、到期日、核销分配","flow":"账单余额汇总 → 区分未到期/逾期 → 下钻明细","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"作废账单排除；到账待分配不自动抵减。"},{"id":"C03","agent":"contract","title":"逾期催缴","role":"一线 / 负责人","question":"需要催缴吗？帮我写一份催缴内容","data":"逾期账单、客户、负责人、已到账待分配、催缴记录","flow":"核账提示 → 选择账单 → 生成草稿 → 人工复核","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"原型仅本地草稿；实际发出走原业务确认流程。"},{"id":"C04","agent":"contract","title":"续签准备","role":"招商 / 管理者","question":"合同快到期了吗，续签准备得怎样？","data":"结束日、90天阈值、续签意向、方案审批、协议状态","flow":"计算剩余天数 → 检查准备清单 → 形成待办建议","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"准备进度不是续签概率，不自动延长合同。"},{"id":"C05","agent":"contract","title":"付款及时性","role":"财务 / 管理者","question":"历史付款是否及时？","data":"账单到期日、核销分配、对应到账日期","flow":"按期分配金额统计 → 识别迟付 → 展示事实","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"按期核销/到期应收；补录时间不替代实际到账时间。"},{"id":"C06","agent":"contract","title":"保证金核验","role":"财务 / 一线","question":"保证金是否交齐？","data":"保证金条款、应缴、有效到账、退还/抵扣记录","flow":"适用性判断 → 有效余额 → 缺口与来源","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"保证金不混入租金回款；未知值不填0。"},{"id":"C07","agent":"contract","title":"到账待分配","role":"财务","question":"客户说已付款，为什么仍欠费？","data":"收款流水、核销分配、到账日期、合同关联","flow":"区分到账与核销 → 展示差异 → 提示核对","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"需要财务正式核销后刷新，不自动修改账。"},{"id":"C08","agent":"contract","title":"企业风险与合同变更","role":"负责人 / 管理者","question":"企业是否有经营风险，合同变更是否频繁？","data":"统一主体标识、外部风险事件、当前合同版本与生效变更","flow":"主体匹配 → 事件核验 → 分项指标 → 与付款行为联合解读","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"当前未取得外部风险及变更接口，显示待核验，不生成虚构异常。"},{"id":"Q01","agent":"ask","title":"经营总览","role":"管理者","question":"当前整体经营情况如何？","data":"资产、客商、合同、租金账单、核销","flow":"授权过滤 → 多域聚合 → 结论/指标/项目表","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"每个指标明确口径与截至时间。"},{"id":"Q02","agent":"ask","title":"欠费催缴分布","role":"一线 / 管理者","question":"目前哪些合同欠费，需要催缴？","data":"账单、核销、到期日、合同、客商、项目","flow":"余额过滤 → 合同/项目聚合 → 合同下钻","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"授权项目内查询；零余额不进入催缴清单。"},{"id":"Q03","agent":"ask","title":"回款分析","role":"财务 / 管理者","question":"各项目回款情况怎么样？","data":"应收账单、核销、项目归属","flow":"统一期间 → 项目分组 → 金额/回款率","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"不以银行流水总额替代已核销。"},{"id":"Q04","agent":"ask","title":"企业关联合同","role":"招商 / 管理者","question":"北京城华房地产开发有限公司签了哪些合同，回款怎么样？","data":"客商ID、签约关系、合同、账单、核销","flow":"主体消歧 → 关联合同 → 分合同对比/总计","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"同名需澄清；同合同多资源关联不得重复汇总。"},{"id":"Q05","agent":"ask","title":"到期统筹","role":"招商 / 管理者","question":"90天内哪些合同到期？","data":"合同结束日、合同状态、负责人、准备清单","flow":"到期窗口过滤 → 按剩余天数排序 → 单合同跳转","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"到期日与续签状态分开展示。"},{"id":"Q06","agent":"ask","title":"资产出租与空置","role":"招商 / 管理者","question":"资产出租率多少，哪里空置？","data":"可租资产、面积快照、有效租用关系","flow":"资产去重 → 可租/已租面积 → 项目/资产明细","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"当前仅载入合同占用资源；未取得完整可租资产，不能计算出租率。"},{"id":"Q09","agent":"ask","title":"连续追问与会话回看","role":"所有用户","question":"按项目展开；查看上次查询结果","data":"会话ID、上下文、授权范围、结果快照、时间","flow":"继承意图 → 补充维度 → 保存快照 → 回看","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"历史不自动更新；重新查询形成新快照。"},{"id":"Q10","agent":"ask","title":"数据不足与澄清","role":"所有用户","question":"今年收入同比增长多少？","data":"指标目录、可用期间、数据覆盖","flow":"识别口径/来源缺失 → 说明缺口 → 建议替代问题","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"不支持问题需澄清，不展示伪造图表。"},{"id":"Q11","agent":"ask","title":"授权与空结果","role":"业务 / 管理者","question":"未授权项目回款情况；逾期超过1亿元的合同","data":"服务端授权范围、指标查询状态、筛选条件","flow":"先鉴权 → 有权再查询 → 区分拒绝/空结果/来源缺失","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"页面不提供授权项目选择器；生产权限必须在服务端执行。"},{"id":"Q12","agent":"ask","title":"年底待回收计划","role":"财务 / 管理者","question":"年底前还有多少账单待回收？","data":"已到期账单、年底前已生成未到期账单、核销分配","flow":"区分到期状态 → 计算计划余额 → 账单下钻","accept":"按2026-11-11读取的4家客户、5份合同快照复核；仅对已取得来源输出结论。","boundary":"账单计划不等于实际回款预测，未生成账单不纳入。"}];
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
function radar(id){const c=contract(id);return [{key:'payment',label:'回款完成',value:pct(c.paid,c.ar),unit:'%',fact:`租金已收 ${money(c.paid)} / 全周期已生成租金应收 ${money(c.ar)}`,formula:'租金已收 / 已载入租金应收 ×100%；含未到期账单',question:'还有哪些账单没交费？'},{key:'timely',label:'付款及时',value:null,unit:'%',fact:'未取得付款实际到账日，无法判断及时性',formula:'需真实到账日、应收日及有效收款对应关系；不以未取得替代0',question:'历史付款是否及时？'},{key:'deposit',label:'保证金到位',value:null,unit:'%',fact:'已取得部分保证金账单，但未取得完整应缴条款及有效保障余额',formula:'完整有效保证金 / 生效应缴；不能用单条账单替代保障余额',question:'保证金交齐了吗？'},{key:'enterprise',label:'企业风险',value:null,unit:'分',fact:'未取得企查查等已授权风险事件',formula:'须接入并核验外部事件，当前不评分',question:'企业风险如何？'},{key:'stability',label:'合同变更',value:null,unit:'分',fact:'未取得完整生效变更及版本记录',formula:'仅统计当前合同生效变更，重签不算变更；当前不评分',question:'合同变更是否频繁？'}]}
function contractReport(id){const c=contract(id),ad=collectionAdvice(c),issues=[];for(const b of c.bills.filter(b=>b.overdue>0)){issues.push({key:'bill-'+b.due,title:`${b.period}租金逾期未缴`,status:'待跟进',fact:`${money(b.balance)} · 应收日 ${b.due} · 逾期 ${-days(b.due)} 天`,analysis:'依据测试系统当前账单待收余额列出。请复核收款凭证、减免及账单状态后确定催缴金额。',advice:ad.configured?ad.action+' '+ad.evidence:`由${c.owner}在1个工作日内与财务核对本笔${money(b.balance)}租金及到账凭证；确认仍未缴后联系客户，发送本期对账及催缴草稿，约定3个工作日内反馈付款日期。未按约付款时提报项目负责人复核后续处理，保留对账单、客户回复和付款计划。`,source:ad.source,action:'bill',value:b.id,label:'查看该笔账单',bill:b,ruleType:'collection'});}if(c.days>=0&&c.days<=90)issues.push({key:'expiry',title:`合同将于${c.end}到期`,status:'待确认安排',fact:`剩余${c.days}天；续签意向、审批和新合同状态未取得。`,analysis:'到期时间来自真实合同台账，不推断续签意向或成功概率。',advice:`由${c.owner}在3个工作日内联系客户确认续签或退出意向；续签时同步核清欠费与保证金，提交租赁方案审批，审批通过后在${c.end}前完成协议签署；退出时登记交还时间并安排验收及结算。`,source:'AI参考建议 · 当前未取得到期管理项目规则',action:'renew',label:'查看到期信息',ruleType:'expiry'});
const axes=radar(id),blocks=[{key:'enterprise',title:'企业风险数据待核验',fact:'未取得外部风险来源',analysis:'不输出真实客户的虚构经营异常或司法风险',advice:'接入已授权企业风险接口并核对主体标识',source:'来源未取得',action:'enterprise'},{key:'stability',title:'合同变更记录待核验',fact:'未取得完整变更记录',analysis:'不将未取得解释为零次变更',advice:'复用合同版本与生效变更接口',source:'来源未取得',action:'changes'}];return {issues,blocks,axes,advice:ad,expiry:null,good:axes.filter(a=>a.value>=90&&a.value!==null).length,attention:axes.filter(a=>a.value>=60&&a.value<90).length,risk:axes.filter(a=>a.value!==null&&a.value<60).length,missing:axes.filter(a=>a.value===null).length}}
function answer(q,scope='all',context={}){const projectKeys=['A','B'].filter(p=>q.includes(scopes[p]));let resolved=projectKeys.length===1?projectKeys[0]:projectKeys.length?scope:context.scope||scope;const base={scope:resolved,question:q,asof:ASOF,period:PERIOD,columns:[],rows:[],metrics:[],chart:[],evidence:[],followups:['哪些合同欠费需要催缴','90天内到期合同有哪些']};
const blank=(kind,title,text)=>({...base,kind,title,text});if(/未授权项目|新城中心|无权限项目/.test(q)||projectKeys.some(p=>scope!=='all'&&p!==scope))return blank('denied','当前无此项目的查询授权','未查询目标项目数据，未返回金额、数量或明细。此为历史异常状态展示案例。');
if(/设备|多经|点位|电梯|消防/.test(q))return blank('unsupported','该业务暂未纳入当前问数','可查询当前载入的合同、客户和租金账单。');
if(/同比|环比|本月|上月|去年|预测/.test(q))return blank('missing','当前缺少可比期间数据','当前快照没有完整可比期间与统一口径，暂不能生成同比或环比。');
if(/超过\s*(1亿|10000万|100000000)/.test(q))return {...blank('empty','当前范围无符合条件的合同','查询完成：当前载入的5份合同中，没有租金逾期未缴超过1亿元的合同。'),evidence:['已载入合同租金账单快照']};
let kind=/合同规模|多少份|多少家/.test(q)?'contracts':/年底|年末|待回收/.test(q)?'yearend':/到期|续签/.test(q)?'expiry':/欠|逾期|催缴|未缴|未收/.test(q)?'overdue':/空置|资产|出租率/.test(q)?'asset':/乐于竞|城华|天拓|清超|客户|企业|客商/.test(q)?'enterprise':/回款|应收|已收|核销/.test(q)?'payment':/整体|概览|总览|经营/.test(q)?'overview':/展开|按项目|继续|明细/.test(q)?context.kind||'clarify':'clarify';
const cs=visible(resolved).map(c=>contract(c.id)),s=summary(resolved),metric=(label,value,unit='元')=>({label,value,unit}),row=c=>({id:c.id,values:[c.id+' / '+c.name,scopes[c.project],money(c.ar),money(c.paid),money(c.overdue)]});let a={...base,kind,title:'',text:'',insights:[]};
if(kind==='clarify')return blank(kind,'请明确业务问题','可查询合同规模、租金回款、未缴账单、到期合同或客户关联合同。');
if(kind==='asset')return {...blank('missing','完整资产台账尚未载入',`目前仅取得5份合同的关联资源及签约面积，共${summary('all').area}㎡，无法据此计算全部可租面积、空置或出租率。`),followups:['合同规模','当前整体经营概览']};
let rs=cs;if(kind==='enterprise'){const key=Object.keys(customers).find(k=>q.includes(customers[k])||q.includes(({A:'乐于竞',B:'城华',C:'天拓',D:'清超'})[k]))||context.customer;if(!key)return blank('clarify','请指定客户名称','可查询北京乐于竞、北京城华、北京天拓斯特、清超卓影四家客户。');rs=cs.filter(c=>c.customer===key);a.customer=key;a.title=customers[key]+' · 关联合同';}
else if(kind==='overdue'){rs=cs.filter(c=>c.overdue>0).sort((a,b)=>b.overdue-a.overdue);a.title='逾期未缴合同清单';}
else if(kind==='expiry'){rs=cs.filter(c=>c.days>=0&&c.days<=90);a.title='90天内到期合同';a.columns=['合同 / 客户','项目','结束日期','剩余天数'];a.rows=rs.map(c=>({id:c.id,values:[c.id+' / '+c.name,scopes[c.project],c.end,c.days+'天']}));a.metrics=[metric('到期合同',rs.length,'份')];a.text=`${scopes[resolved]}中有${rs.length}份合同在90天内到期。`;}
else if(kind==='yearend'){const bs=bills.filter(b=>cs.some(c=>c.id===b.contract)&&b.due<='2026-12-31'),over=sum(bs.filter(b=>b.due<ASOF),'balance'),future=sum(bs.filter(b=>b.due>=ASOF),'balance');a.title='年底前已生成租金账单待回收';a.metrics=[metric('逾期未缴',over),metric('未到期待缴',future),metric('年底前待回收',over+future)];a.text=`已生成账单按应收日统计：逾期未缴${money(over)}，年底前未到期${money(future)}。`;a.columns=['合同 / 客户','账期','应收日','待缴金额'];a.rows=bs.map(b=>({id:b.contract,values:[b.contract+' / '+contract(b.contract).name,b.period,b.due,money(b.balance)]}));}
else a.title=kind==='contracts'?'合同规模与客户分布':kind==='payment'?'各项目租金回款情况':'当前载入数据经营概览';
if(!a.columns.length){a.columns=['合同 / 客户','项目','租金应收','租金已收','逾期未缴'];a.rows=rs.map(row);const ar=sum(rs,'ar'),paid=sum(rs,'paid'),over=sum(rs,'overdue');a.metrics=[metric('租金应收',ar),metric('租金已收',paid),metric('逾期未缴',over),metric('关联合同',rs.length,'份')];a.text=`${scopes[resolved]}内共${rs.length}份合同、${new Set(rs.map(c=>c.customer)).size}家客户。已载入租金应收${money(ar)}，租金已收${money(paid)}，逾期未缴${money(over)}。`;}
a.insights=[`统计范围为已核对的4家客户、5份合同，当前选择：${scopes[resolved]}。租金与保证金分别计算，账单应收包含全周期已生成记录；逾期仅取应收日早于${ASOF}且有待收余额的租金账单。`,kind==='expiry'?'建议先确认续签或退出意向，再核验欠费及保证金资料。':'建议先核账，再查询对应项目生效规则生成建议事项；规则未取得时使用明确标注的AI参考建议。'];a.evidence=rs.map(c=>c.id+' · 测试系统合同台账/账单管理 · '+ASOF);return a;}
const api={ASOF,PERIOD,customers,contracts,bills,depositBills,assets,scopes,visible,contract,summary,riskSignals,radar,answer,enterpriseProfiles,changeProfiles,projectPolicies,scheduledBills,collectionAdvice,contractReport,SCENES,money,pct};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CoreModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
