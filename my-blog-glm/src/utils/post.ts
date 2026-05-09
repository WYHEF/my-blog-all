import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from '@/config';

export type Post = CollectionEntry<'blog'>;

// 获取所有文章并按日期排序
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => 
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}

// 根据分类获取文章
export async function getPostsByCategory(category: Category): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.category === category);
}

// 获取所有标签
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// 根据标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.tags?.includes(tag));
}

// 获取相邻文章（上一篇/下一篇）
export async function getAdjacentPosts(currentSlug: string) {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null
  };
}

// 格式化日期
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 从 Markdown 内容中提取第一张图片路径
 * 用于 PostCard 封面图自动提取
 */
export function extractFirstImage(content: string): string | null {
  // 匹配标准 Markdown 图片语法 ![alt](url)
  const imgRegex = /!\[.*?\]\((.*?)\)/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}

/**
 * 根据分类获取对应的渐变色背景
 * 用于无封面图时的占位块样式
 */
export function getCategoryGradient(category: string): string {
  const gradients: Record<string, string> = {
    tech: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
    notes: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    travel: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
  };
  return gradients[category] || gradients.tech;
}

// 计算阅读时间（基于字数）
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

