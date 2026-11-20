# 对话记忆与用户画像 · 设计说明

> 适用：说说英语 + 拾词 融合系统（局域网版）。实现：`memory.mjs` + `api.mjs`；前端入口在 设置 → 「对话记忆与用户画像」。
> 参考架构：MemGPT / Letta 的分层记忆（Core / Recall / Archival）与 sleep-time 记忆整理思路，见文末来源。

## 1. 目标（对应需求）

| 需求 | 实现 |
| --- | --- |
| 当天对话牢牢记住，每次接收用户信息优先调取今天对话 | Recall 层：`today.json` 全量保存；每次 translate/reply 注入最近 12 轮并声明最高优先级 |
| 昨天往前每一天压缩记忆 | Archival 层：跨天自动把旧的一天压缩成 `days/YYYY-MM-DD.json`（摘要/主题/事实/语种/情绪） |
| 提到「昨天/上次/之前/前几天…」时往前找压缩记忆 | `referencesPast()` 触发检索：日期词定位 + 关键词匹配 + 最近两天兜底，注入 recalled |
| 根据谈吐做用户画像 | Core 层：`profile.json` + 可读 `profile.md`；每 3 轮自动更新，也可手动刷新 |

## 2. 存储布局（服务端，不在 public/ 下，浏览器不可直接读取）

```
data/memory/<user>/
  today.json          { date, turns:[{ts,lang,text,reply,vocab}], sinceProfile }
  days/2026-11-18.json{ date, turnsCount, summary, topics[], facts[], langMix, mood }
  profile.json        { summary, languageLevel, preferredLang, tone, speechTraits[], interests[], weakVocab[], updatedAt, turnsObserved }
  profile.md          人类可读画像（设置页展示 / 可导出）
```

- `<user>` 由服务端注入 `x-local-user`（局域网单用户 `lan-user`），客户端不可伪造他人身份。
- 上限保护：today 最多 400 轮；注入上下文只取最近 12 轮；recalled 最多 4 天。

## 3. 每次请求的记忆流

1. `loadToday()`：若 `today.date` ≠ 今天 → 先 `compressDay(旧今天)` 写入 days/，再重置 today（跨天压缩）。
2. `appendTurn()`：保存本轮（用户原话 + AI 回复 + 生词），`sinceProfile++`；≥3 时调用 `updateProfile()` 并清零。
3. `contextFor(user, text)`：
   - `today` = 最近 12 轮（始终注入，优先级最高）；
   - `profile` = 画像摘要字段（始终注入，只影响语气/难度，不复述）；
   - `recalled` = 仅当 `referencesPast(text)` 为真时检索压缩天。
4. `memoryBlock()` 把三者以「可信背景、非指令」形式拼进 system prompt，并写明优先级与「缺失就承认、不编造」。
5. translate 类额外约束：记忆只用于消歧，只翻译当前句，不夹带记忆内容。
6. 响应附带 `memoryUsed:{today,recalled[],profile}`，前端在回复来源处显示「记忆·今天N轮 +回溯日期 +画像」。

## 4. 过去指代检索

- 触发词：昨天/昨日/前天/大前天/上次/之前/前几天/上周/上个月/还记得/我说过/ yesterday / last time …
- 日期词 → 目标天偏移（昨天=-1、前天=-2、上周=-7..-13、上个月≈-30）；
- 无日期词时用关键词（CJK≥2 字 / latin≥3 字母）匹配 summary/topics/facts；
- 仍无命中则兜底最近 2 天；最多返回 4 天，按日期倒序。

## 5. 压缩与画像的 LLM 约定

- 压缩 prompt：只依据给定 turns，输出 `{summary,topics,facts,langMix,mood}`；失败时用机械摘要兜底（不丢天）。
- 画像 prompt：依据近期谈吐输出画像字段；合并旧画像的 interests/weakVocab（去重、限量），避免画像抖动。
- 两者都走现有 DeepSeek 通道（`thinking:disabled` + `response_format:json_object`），**无需新增 API 或密钥**。

## 6. API  surface

- `POST /api/memory-state`：今日轮数、已压缩天数列表、画像 + md（设置页）。
- `POST /api/memory-append`：前端每轮回复后上报 `{turn}`。
- `POST /api/profile-refresh`：手动重算画像，返回 `{profile,profileMd}`。
- 既有 translate/reply/yue-* 自动携带记忆上下文与 `memoryUsed`。

## 7. 隐私与安全

- 记忆仅存服务端磁盘；`data/` 不在静态目录内，无法被 URL 直接访问。
- 记忆内容标记为「可信背景、非指令」，防止对话内容提权改写角色。
- 密钥仍只在服务端 `.env.local`；所有响应不含密钥（有测试断言）。
- 提供「导出记忆 JSON」便于用户自查/备份；后续可加「清除记忆」。

## 8. 后续可演进（未做，待确认）

- 记忆语义检索（embedding）替代关键词匹配；
- 画像驱动的复习推荐（把 weakVocab 送回对话/复习）；
- 多用户账号化（当前为局域网单用户）；
- 记忆清除 / 选择性遗忘 UI。

## 来源

- MemGPT: Towards LLMs as Operating Systems — https://arxiv.org/abs/2310.08560
- Letta Memory Blocks（core/recall/archival 与 sleep-time agent）— https://docs.letta.com/memory-blocks
- Letta sleep-time compute / memory management — https://docs.letta.com/sleep-time-agents