# 贡献指南

感谢你考虑为这个项目做出贡献！

## 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/yourusername/my-blog/issues) 是否已存在相关问题
2. 如果没有，创建一个新的 Issue
3. 清晰地描述问题或建议
4. 如果是 bug，请提供复现步骤

### 提交代码

1. **Fork 项目**
   ```bash
   # 点击 GitHub 上的 Fork 按钮
   ```

2. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/my-blog.git
   cd my-blog
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **开发和测试**
   ```bash
   npm run dev
   npm run build  # 确保能正常构建
   ```

6. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **推送到 GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建 Pull Request**
   - 在 GitHub 上创建 PR
   - 清晰地描述你的更改
   - 关联相关的 Issue（如果有）

## 代码规范

### 命名规范

- **文件名**: 使用 PascalCase（组件）或 kebab-case（页面）
  - `PostCard.astro`
  - `blog-post.md`

- **变量名**: 使用 camelCase
  ```typescript
  const userName = "张三";
  const postList = [];
  ```

- **常量**: 使用 UPPER_SNAKE_CASE
  ```typescript
  const MAX_POSTS = 10;
  const API_URL = "https://api.example.com";
  ```

### TypeScript

- 尽可能使用类型注解
- 避免使用 `any`
- 优先使用接口（interface）而非类型别名（type）用于对象形状

```typescript
// ✅ 好
interface User {
  name: string;
  age: number;
}

// ❌ 避免
const user: any = { name: "张三" };
```

### Astro 组件

- 组件文件使用 PascalCase
- Props 使用 TypeScript 接口定义
- 样式使用 scoped CSS

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="component">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<style>
  .component {
    /* 样式 */
  }
</style>
```

### CSS

- 使用 CSS 变量
- 遵循 BEM 命名规范（可选）
- 移动端优先的响应式设计

```css
/* 使用 CSS 变量 */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-sm);
}

/* 移动端优先 */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}
```

## Commit 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 示例

```bash
feat(blog): add search functionality

- Implement client-side search
- Create search component
- Generate search index

Closes #123
```

## 文档

- 更新代码时，同步更新相关文档
- 注释应该解释"为什么"而不是"是什么"
- 复杂的逻辑必须添加注释

## 测试

- 在提交前确保项目能正常构建
- 测试响应式设计
- 检查不同浏览器的兼容性

```bash
npm run build
npm run preview
```

## 许可证

通过提交代码，你同意你的贡献将使用与项目相同的 MIT 许可证。

## 问题？

如有任何问题，欢迎：
- 创建 Issue
- 发送邮件到 your@email.com
- 在讨论区提问

感谢你的贡献！ 🎉

