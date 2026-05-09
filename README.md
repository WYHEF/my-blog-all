# 哔哩哔哩直播 - AI 模型改造博客项目合集

## 项目简介

本仓库记录了在哔哩哔哩直播期间，使用各种 AI 模型对个人博客进行改造的成果。

通过对比不同 AI 模型（小米 MIMO、智谱 GLM、DeepSeek、Kimi、GPT、Claude 等）在前端开发、代码生成、多模态理解等方面的能力，探索 AI 在实际工程中的应用效果。

## 项目结构

- **my-blog-ds4** - DeepSeek V4 版本
- **my-blog-ds4pro** - DeepSeek V4 Pro 版本
- **my-blog-glm** - 智谱 GLM 版本
- **my-blog-kimi** - Kimi 版本
- **my-blog-mimo** - 小米 MIMO 版本
- **my-blog-mimo2.5** - 小米 MIMO 2.5 版本
- **my-blog-mimo2.5pro** - 小米 MIMO 2.5 Pro 版本
- **my-blog-mimo2.5video** - 小米 MIMO 2.5 视频版本

## 测试流程

1. 使用 Claude Code + CC Switch 切换不同 AI 模型
2. 将相同的博客改造需求文件提供给各个模型
3. 记录各模型的执行效果和特点

## 测试结果对比

### 前端效果对比

| 模型 | 效果截图 |
| --- | --- |
| GLM-5V | ![GLM-5V效果](images/mimo-use-4.png) |
| GLM-5.1 | ![GLM-5.1效果1](images/mimo-use-5.png) |
| GLM-5.1 | ![GLM-5.1效果2](images/mimo-use-6.png) |
| MIMO-2.5 | ![MIMO-2.5效果1](images/mimo-use-7.png) |
| MIMO-2.5 | ![MIMO-2.5效果2](images/mimo-use-8.png) |
| MIMO-2.5-Pro | ![MIMO-2.5-Pro效果1](images/mimo-use-9.png) |
| MIMO-2.5-Pro | ![MIMO-2.5-Pro效果2](images/mimo-use-10.png) |
| DeepSeek-V4-Pro | ![DeepSeek-V4-Pro效果](images/mimo-use-11.png) |
| DeepSeek-2号本地部署 | ![DeepSeek本地部署效果](images/mimo-use-12.png) |
| GPT-5.5 | ![GPT-5.5效果1](images/mimo-use-13.png) |
| GPT-5.5 | ![GPT-5.5效果2](images/mimo-use-14.png) |
| GPT-5.5 | ![GPT-5.5效果3](images/mimo-use-15.png) |
| 网友Kimi | ![网友Kimi效果](images/mimo-use-16.png) |
| Kimi-Coding | ![Kimi-Coding效果1](images/mimo-use-17.png) |
| Kimi-Coding | ![Kimi-Coding效果2](images/mimo-use-18.png) |
| Claude-Opus-4.7 | ![Claude-Opus-4.7效果](images/mimo-use-19.png) |
| Claude-4.7-Max | ![Claude-4.7-Max效果](images/mimo-use-20.png) |

### 前端结论

**Claude >= KIMI > GPT >>> GLM > DS = MIMO**

> 注: websearch 功能在 GLM、DS 和 MIMO 上没有用上

## 关键发现

### 小米 MIMO 模型特点

1. **Token 消耗大** - MIMO 消耗的 token 比其他模型（如 DeepSeek V3）大约 5 倍
2. **多模态支持** - MIMO 2.5 是多模态模型，但 MIMO 2.5 Pro 是纯文本模型
3. **工具调用** - 支持第三方工具和联网搜索
4. **道德限制** - MIMO 2.5 Pro 有较强的道德感和法律意识限制
5. **长文本能力强** - 适合复杂工程任务，但简单任务反而不如 DeepSeek V3

### 各模型对比

| 模型 | 优势 | 劣势 |
| --- | --- | --- |
| Claude | 审美最佳，交互动效好 | 价格较高 |
| Kimi | 前端审美无敌，有人味 | - |
| GPT-5.5 | 综合能力强 | - |
| GLM-5.1 | 速度快 | 前端效果一般 |
| DeepSeek | 简单任务又快又好 | 复杂任务能力有限 |
| MIMO | 长文本处理强 | Token 消耗大，前端效果一般 |

## 相关资源

### 详细文档
- **飞书文档**: [小米 MIMO 使用体验记录](https://tcnsc6emi3jy.feishu.cn/wiki/Tv1kwF72PiF06UkMOjmcSsCNnsh?from=from_copylink)
- **博客文章**: [小米 MIMO 使用体验](https://new.wyhef.cloud/blog/%E5%B0%8F%E7%B1%B3mimo)

### 工具和平台
- 小米 MIMO 平台: https://platform.xiaomimimo.com
- CC Switch: 用于在 Claude Code 中切换不同 AI 模型
- Claude Code: Anthropic 官方 CLI 工具

## 作者

- B站ID: 五氧化二钒
- GitHub: WYHEF

## 许可证

本项目仅用于学习和研究目的。
