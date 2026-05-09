# 博客前端视觉风格重构计划

## Context

用户希望参考 x.ai 的视觉风格，对博客进行全面视觉翻新。核心需求：微妙动效、渐变、精致的双主题体验。内容结构（URL/分类/标签）不可变，其他均可调整。

**Deep Interview Spec**: `.omc/specs/deep-interview-blog-visual-refactor.md`

## 实施步骤

### Step 1: 更新 CSS 变量系统 (`src/styles/global.css`)

重新设计颜色、阴影、圆角、间距变量，参考 x.ai 的视觉语言：

- **配色**: 保持暖色调但提升质感——更深的背景、更精致的 primary 色
- **阴影**: 添加 `--shadow-sm`, `--shadow-md`, `--shadow-lg`（当前缺失）
- **圆角**: 扩大 `--radius-sm`/`--radius-md` 范围，增加 `--radius-lg`
- **渐变**: 新增 `--gradient-primary` 等渐变变量
- **动效**: 新增 `--transition-fast`/`--transition-normal` 统一过渡时间

### Step 2: 升级全局基础样式 (`src/styles/global.css`)

- 添加全局 `scroll-behavior: smooth`
- 为 `a` 标签添加 hover 渐变色过渡
- 为 `h1-h6` 添加微妙的渐变文字效果（`background-clip: text`）
- 优化 `blockquote` 样式——左侧渐变边框 + 背景微调
- 为 `code`/`pre` 添加更精致的样式
- 为 `table` 添加 hover 行高亮动效

### Step 3: 组件视觉升级

逐个升级关键组件的 scoped style：

**3a. PostCard.astro** — 卡片式设计
- 添加阴影 + 圆角 + 背景色
- hover 时微上浮（`transform: translateY(-2px)`）+ 阴影加深
- 标题渐变色 hover 效果

**3b. Header.astro** — 精致导航
- 背景模糊效果（`backdrop-filter: blur`）
- 导航链接 hover 下划线动画（`::after` 宽度过渡）
- 当前页面链接高亮

**3c. LeftSidebar.astro** — 侧边栏美化
- 分类/标签项 hover 渐变背景
- 当前选中项左侧渐变指示条
- 滚动区域平滑滚动

**3d. TableOfContents.astro** — TOC 目录
- active 链接渐变色指示
- hover 微动效

**3e. Footer.astro** — 底部精致化
- 链接 hover 动效
- 分隔线渐变效果

**3f. Pagination.astro** — 分页卡片化
- 按钮阴影 + 圆角 + hover 上浮

**3g. Search.astro** — 搜索框美化
- 输入框聚焦时渐变边框
- 搜索结果列表动效

**3h. blog/[...slug].astro** — 文章详情页
- 文章标题渐变效果
- 标签 hover 动效
- 代码块样式优化

**3i. index.astro** — 首页
- Hero 区域渐变背景
- 文章列表交错入场动效

**3j. about.astro** — 关于页
- 技能条渐变动画
- 头像 hover 微旋转

**3k. projects.astro / videos.astro** — 项目/视频页
- 卡片统一风格（阴影+圆角+hover 上浮）

### Step 4: 暗色模式精调 (`src/styles/global.css`)

- 暗色模式下调整渐变色值，确保对比度
- 暗色模式阴影更深沉（`rgba(0,0,0,0.3)` 而非纯黑）
- 暗色模式下渐变文字效果适配

### Step 5: 响应式适配检查

- 确保动效在移动端（768px 以下）正常工作
- 移动端减少复杂动效（可用 `prefers-reduced-motion` 媒体查询）
- 确认侧边栏隐藏后布局无异常

### Step 6: 构建验证

- `npm run build` 确保构建成功
- `npm run dev` 启动开发服务器验证
- 检查亮色/暗色模式切换
- 检查移动端响应式

## 关键文件清单

| 文件 | 操作 |
|------|------|
| `src/styles/global.css` | 大幅修改（变量+基础样式+暗色模式） |
| `src/components/PostCard.astro` | 修改 scoped style |
| `src/components/Header.astro` | 修改 scoped style |
| `src/components/LeftSidebar.astro` | 修改 scoped style |
| `src/components/TableOfContents.astro` | 修改 scoped style |
| `src/components/Footer.astro` | 修改 scoped style |
| `src/components/Pagination.astro` | 修改 scoped style |
| `src/components/Search.astro` | 修改 scoped style |
| `src/pages/blog/[...slug].astro` | 修改 scoped style |
| `src/pages/index.astro` | 修改 scoped style |
| `src/pages/about.astro` | 修改 scoped style |
| `src/pages/projects.astro` | 修改 scoped style |
| `src/pages/videos.astro` | 修改 scoped style |
| `src/pages/404.astro` | 修改 scoped style |

## 复用现有代码

- 保留现有 CSS 变量命名约定（`--color-*`, `--spacing-*`, `--font-*`）
- 保留现有暗色模式切换机制（`html.dark` 类切换）
- 保留 ThemeToggle.astro 和 FontResizer.astro 的功能逻辑
- 保留 Astro scoped style 模式，不引入新框架

## 验证方式

1. `npm run dev` 启动开发服务器
2. 访问首页、文章详情页、关于页、项目页，检查视觉效果
3. 切换亮色/暗色模式，确认双主题都好看
4. 缩小浏览器窗口到 768px 以下，检查移动端体验
5. hover 各类元素，确认动效正常
6. `npm run build` 确保生产构建成功
