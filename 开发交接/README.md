# 开发交接包 V2.4

先读01开发规格书，再按角色阅读数据/中台/任务文件。不要仅用产品入口截图进行开发。

## 文件入口

- 01_开发规格书.md：8个场景的业务步骤、字段、交互、分支、计算和验收。
- 02_数据模型与真实系统适配.md：字段、关系、SQL顺序、适配器、缺少的真实材料与责任。
- 03_中台节点与提示词规格.md：模型输入输出、消歧、工具绑定、续问和解释校验。
- 04_原30场景开发覆盖矩阵.md：逐场景明确本轮落实及仍需扩展的能力。
- 05_开工任务与验收对照.md：前端/后端/中台/测试可直接拆工单的任务及完成条件。
- reference/openapi.json：OpenAPI 3.1，11项业务接口、32个Schema。
- reference/examples/：完整请求响应文件，不能把里面一次生成的analysis_id当成自己实例中的有效ID。
- reference/：Python 3.9及以上标准库参考服务，无需安装第三方依赖。

## 一次跑通

解压后进入本目录的reference目录：

```bash
python3 -m unittest discover -s tests -v
python3 server.py --port 8765
```

另开终端调用单合同：

```bash
curl http://127.0.0.1:8765/v1/analyses/contract \
  -H 'Authorization: Bearer demo-clerk-a' \
  -H 'Content-Type: application/json' \
  -d '{"contract_id":"HT-A01","as_of":"2026-11-08"}'
```

调用企业整体：

```bash
curl http://127.0.0.1:8765/v1/analyses/enterprise \
  -H 'Authorization: Bearer demo-manager' \
  -H 'Content-Type: application/json' \
  -d '{"enterprise_ids":["A"],"as_of":"2026-11-08"}'
```

完整链路客户端：保持server.py运行，执行 `python3 smoke_http.py --port 8765`。它会实际走HTTP验证单合同→企业→下钻→草稿→确认→重核，并打印新生成的分析/核查ID。

## 三个演示角色

| 公开演示Bearer值 | 角色 | 访问/责任 | 允许 |
|---|---|---|---|
| demo-clerk-a | 一线经办 | 访问项目A；本人负责A01（A03虽本人负责但无权） | 分析、草稿、确认登记核查 |
| demo-manager | 管理者 | 访问A/B项目 | 全范围分析；不能登记核查 |
| demo-finance | 财务 | 访问A/B项目 | 分析、自己草稿的确认登记；不开放财务核销HTTP接口 |

这些令牌不是密码，不对应真实用户。生产必须移除演示身份适配器。

## 与网页关系

GitHub Pages提供方案、API浏览器和开发包下载，不运行Python，也未接真实AI模型。前端正式开发通过本地API或资管测试环境联调；不要让公开GitHub网页自动调用客户内网API或本机localhost。

V2.4接口采用明确的人民币分整数、比例基点整数和页码分页，与V2.3的通用蓝图字段不同；开发以本包OpenAPI为P0基线，扩展能力另行版本化。
