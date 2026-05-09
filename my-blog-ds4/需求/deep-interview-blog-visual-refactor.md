# Deep Interview Spec: 博客前端视觉风格重构

## Metadata
- Interview ID: di-blog-visual-refactor-20260504
- Rounds: 8
- Final Ambiguity Score: 19.75%
- Type: brownfield
- Generated: 2026-05-04
- Threshold: 20%
- Initial Context Summarized: no
- Status: PASSED

## Clarity Breakdown
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Goal Clarity | 0.85 | 35% | 0.2975 |
| Constraint Clarity | 0.80 | 25% | 0.2000 |
| Success Criteria | 0.80 | 25% | 0.2000 |
| Context Clarity | 0.70 | 15% | 0.1050 |
| **Total Clarity** | | | **0.8025** |
| **Ambiguity** | | | **19.75%** |

## Goal
参考 x.ai 的视觉风格，为博客项目进行全面的视觉风格翻新，重点引入微妙的动效和渐变，提升整体视觉精致度。保持内容结构（URL、分类、标签）不变。

## Constraints
- 内容结构（文章 URL 路径、分类、标签体系）不可改变
- 页面布局（三栏侧边栏结构）可调整
- 现有功能（暗色模式切换、FontResizer）可调整或重做
- 技术栈可变（可引入 CSS 框架或 JS 动画库）
- 不修现有 CSS bug（未定义变量、死变量），专注视觉升级

## Non-Goals
- 不修复现有的 CSS 技术债务（--shadow-sm/--shadow-lg 未定义、--font-serif 死变量）
- 不重构 CSS 架构本身（scoped style 模式保持）
- 不改变博客的内容管理系统（Astro Content Collections）

## Acceptance Criteria
- [ ] 页面加载后有明显的视觉改善感，整体更精致、更有层次
- [ ] hover 状态有微动效（按钮、链接、卡片）
- [ ] 标题和关键元素有渐变效果
- [ ] 卡片有阴影和圆角，视觉层次分明
- [ ] 滚动有平滑过渡效果
- [ ] 暗色模式看起来高级精致（参考 x.ai 风格）
- [ ] 亮色模式同样好看，不偏废
- [ ] 移动端（768px 以下）体验良好
- [ ] `npm run build` 构建成功
- [ ] `npm run dev` 开发服务器正常运行

## Assumptions Exposed & Resolved
| Assumption | Challenge | Resolution |
|------------|-----------|------------|
| "重构"意味着重构 CSS 架构 | 目标是什么？ | 用户想要视觉翻新，不是架构重构 |
| 必须保持暗色模式 | 暗色模式是核心需求吗？ | 是的，双主题都要好看 |
| 需要修现有 CSS bug | bug 修不修？ | 暂不修，专注视觉升级 |
| 动效要用纯 CSS | 有技术偏好吗？ | 不限技术方案 |
| 需要改很多 HTML 结构 | 结构能动吗？ | 可以大改，但内容结构（URL/分类/标签）不动 |

## Technical Context
### 当前代码库状态
- **CSS 架构**: 单一 global.css (233行) + 19个组件的 scoped style
- **布局**: 三栏固定侧边栏（Header 60px fixed, LeftSidebar 280px fixed, TOC 240px fixed）
- **主题**: CSS 变量系统，html.dark 类切换
- **断点**: 768px (mobile), 1024px (tablet), 1200px (desktop)
- **字体**: 系统字体栈，无自定义字体加载
- **框架**: 无 CSS 框架，纯手写 CSS
- **已知问题**: --shadow-sm/--shadow-lg 未定义，--font-serif 死变量，多处样式重复
- **参考风格**: x.ai — 暗色为主、极简、未来感、微妙动效

## Ontology (Key Entities)
| Entity | Type | Fields | Relationships |
|--------|------|--------|---------------|
| Visual Style | core domain | colors, fonts, spacing, shadows, gradients, animations | defines the look of all Components |
| CSS Architecture | supporting | global.css, scoped styles, CSS variables | implements Visual Style |
| Component | supporting | Header, Sidebar, PostCard, Footer, etc. | consumes Visual Style via CSS Architecture |
| Layout Structure | supporting | three-column, fixed sidebar, responsive breakpoints | composed of Components |
| Animation/Gradient | supporting | hover effects, scroll transitions, gradients, card shadows | enhances Visual Style |

## Ontology Convergence
| Round | Entity Count | New | Changed | Stable | Stability Ratio |
|-------|-------------|-----|---------|--------|----------------|
| 1 | 3 | 3 | - | - | - |
| 2 | 4 | 1 | 0 | 3 | N/A |
| 3 | 4 | 0 | 0 | 4 | 100% |
| 4 | 4 | 0 | 0 | 4 | 100% |
| 5 | 5 | 1 | 0 | 4 | 80% |
| 6 | 5 | 0 | 0 | 5 | 100% |
| 7 | 5 | 0 | 0 | 5 | 100% |
| 8 | 5 | 0 | 0 | 5 | 100% |

## Interview Transcript
<details>
<summary>Full Q&A (8 rounds)</summary>

### Round 1
**Q:** 你说的「前端样式重构」，具体指的是什么？当前项目有 19 个组件/页面都使用 scoped style，global.css 有 233 行。你想解决的核心问题是什么？
**A:** 全面翻新视觉风格
**Ambiguity:** 72.5% (Goal: 0.4, Constraints: 0.1, Criteria: 0.1, Context: 0.6)

### Round 2
**Q:** 这次重构的边界在哪里？你希望我动哪些东西，不动哪些东西？
**A:** 允许较大结构改动
**Ambiguity:** 58.5% (Goal: 0.5, Constraints: 0.5, Criteria: 0.1, Context: 0.6)

### Round 3
**Q:** 如果我改完了，你怎么判断「这次重构是成功的」？有没有参考网站、设计稿、或者具体的视觉问题要解决？
**A:** https://x.ai/ 有参考网站如上
**Ambiguity:** 38.5% (Goal: 0.7, Constraints: 0.5, Criteria: 0.6, Context: 0.6)

### Round 4
**Q:** 反过来问：这次重构中，有哪些东西你绝对不想改变？
**A:** 内容结构不动
**Ambiguity:** 34% (Goal: 0.7, Constraints: 0.7, Criteria: 0.6, Context: 0.6)

### Round 5
**Q:** 你最想从 x.ai 借鉴哪些视觉特征？
**A:** 微妙的动效和渐变
**Ambiguity:** 30.5% (Goal: 0.8, Constraints: 0.7, Criteria: 0.6, Context: 0.6)

### Round 6
**Q:** 假设我现在改完了，你打开博客看一眼，什么会让你觉得「这次改得值了」？
**A:** 全部都要（视觉观感提升 + 交互细节丰富 + 双主题都好看）
**Ambiguity:** 23.75% (Goal: 0.85, Constraints: 0.7, Criteria: 0.8, Context: 0.6)

### Round 7
**Q:** 动效和渐变的实现方式你有偏好吗？
**A:** 不限技术方案
**Ambiguity:** 21.25% (Goal: 0.85, Constraints: 0.8, Criteria: 0.8, Context: 0.6)

### Round 8
**Q:** 我探索代码时发现了一些 CSS 问题（未定义变量、死变量、重复样式）。你希望怎么处理？
**A:** 先不管 bug，专注视觉
**Ambiguity:** 19.75% (Goal: 0.85, Constraints: 0.8, Criteria: 0.8, Context: 0.7)

</details>
