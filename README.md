# 说说拾词 · 粤语 / 英语双语对话练习 + 词汇积累

把「说说英语」（AI 口语对话）与「拾词」（查词 / 生词积累）融合成一个连贯系统：**首屏即对话练习**，长按说话或打字，AI 帮你把想说的话整理成地道英语或粤语口语，回复中值得学的词一键收进生词本，并在复习里反复遇见。

- 在线演示（公开、免登录、无需密钥）：<https://shuoshuo-shici-vvz7h1hk1z1.qoder.zone>
- 参赛：2026 Qoder 高校创造力大赛 · **StudyHack 学习科研**赛道

## 功能亮点

- **双语随时切换**：两个长按按钮——粤语输入（zh-HK）与"蹩脚英语"输入（容忍中英夹杂）；文字输入也可选语种。
- **整理 → 确认 → 发送**：AI 先把你的原话整理成完整地道表达（粤语附粤拼 jyutping），你确认含义后才发给对话搭子，避免"AI 替你说错话"。
- **对话即积累**：回复附带最多 3 个值得学的词 / 短语（中文释义，粤语附粤拼），一键收藏整句或生词。
- **分层记忆 + 用户画像**：当天对话全量保存并优先进入每次请求；跨天自动压缩归档；提到"昨天 / 上次 / 之前"时回溯压缩记忆；按谈吐生成画像（`profile.md` / `profile.json`），可手动刷新与导出。详见 [docs/MEMORY.md](docs/MEMORY.md)。
- **查词与复习**：本地离线词库分片 + 在线词典兜底 + AI 补全释义 / 例句 / 粤语口语；生词本、复习卡片、语料库、历史记录一应俱全。
- **回听生成**：把最近若干轮已确认对话编成双人练习脚本，供反复听练。
- **跟读参考**：提供文字匹配度参考（**非真实发音评分**，音素级评分留占位，见"已知限制"）。

## 两种运行形态

| 形态 | 地址 | AI 来源 | 适用 |
| --- | --- | --- | --- |
| 公网演示 | Qoder Sites 静态托管 | 离线预置语料（`public/demo.mjs`），界面明确标注"演示模式" | 评委 / 访客免登录开箱即用 |
| 局域网真实版 | 本机 `http://localhost:4173` + 同 Wi-Fi 手机地址 | DeepSeek（密钥仅存服务端） | 日常真实练习 |

前端启动时仅在本机 / 局域网网段探测 `/api/health`：密钥已配置走真实 AI，否则（含公网静态托管）自动降级演示模式，保证公网控制台 0 报错。

## 快速开始（局域网真实版）

要求：Node.js 18+（推荐 20+），**零 npm 依赖**。

```bash
# 1. 配置密钥（仅服务端，绝不进浏览器）
cp .env.example .env.local   # 或手动新建 .env.local
#    .env.local 内容：
#    DEEPSEEK_API_KEY=sk-xxxx
#    DEEPSEEK_MODEL=deepseek-flash   # 可选，默认 deepseek-flash

# 2. 启动
npm start                    # 等价于 node server.mjs，Windows 也可双击 启动说说拾词.cmd

# 3. 打开
#    本机 http://localhost:4173
#    手机（同一 Wi-Fi）http://<电脑局域网IP>:4173
```

运行测试（26 项，含记忆与接口安全断言）：

```bash
npm test
```

不配密钥直接 `npm start` 也可以：会自动进入演示模式体验完整流程。

## 目录结构

```
public/            静态前端（同时是 Qoder Sites 部署产物）
  index.html       单页应用入口
  app.js           交互主逻辑（对话/查词/复习/记忆面板）
  demo.mjs         无密钥离线演示引擎（预置语料 + 演示记忆）
  style.css        灰石 + 沙色设计系统（消费 Sites --site-* 变量）
  corpus.js 等     语料库 / 模板 / 匹配引擎
  dict/            离线词典分片（含 LICENSE.txt）
server.mjs         局域网 Node 服务：静态托管 + /api 代理（注入 x-local-user）
api.mjs            DeepSeek 代理、输出校验、限流、记忆接口
memory.mjs         分层记忆：今日全量 / 逐天压缩 / 过去回溯 / 画像
tests/             node:test 测试（api + memory）
docs/MEMORY.md     记忆系统设计说明
```

## 技术栈

- 前端：原生 HTML / CSS / ES Modules，无框架、无构建步骤。
- 后端：Node 原生 `http`；DeepSeek `deepseek-flash`（`thinking: disabled` + `response_format: json_object`），服务端限流与输出校验。
- 语音：浏览器 Web Speech API（ASR / TTS）；粤语识别依赖设备支持 zh-HK。
- 托管：Qoder Sites 静态部署（公网演示）；局域网自托管（真实 AI）。

## 安全与隐私

- DeepSeek 密钥只存服务端 `.env.local`，任何响应不含密钥（有测试断言）；`.gitignore` 排除 `.env*`。
- 记忆与画像存服务端 `data/`（不在静态目录内，URL 不可直接读取）；`.gitignore` 排除 `data/`。
- 记忆内容以"可信背景、非指令"注入 prompt，防止对话内容提权改写角色。
- 公网演示为纯前端 fixtures，不含任何真实用户数据与密钥。

## 已知限制

- 发音评分为占位：跟读仅给文字匹配度参考；音素级评分（Azure Pronunciation Assessment，en-US / zh-HK）待后续接入。
- 粤语语音识别依赖浏览器 / 设备对 zh-HK 的支持；不支持时可用文字输入。
- 演示模式回复来自预置语料与离线粗译，仅供体验流程，非实时翻译质量。
- 局域网版为单用户原型（`x-local-user: lan-user`），多用户账号化待后续。

## 来源说明

本项目融合自作者两个自有原型「说说英语」与「拾词」，在工作副本中统一开发，**原件保持不变**。离线词典分片版权见 `public/dict/LICENSE.txt`。