import type { APIRoute } from 'astro';
import { getAllPosts } from '@/utils/post';
import { SITE_CONFIG } from '@/config';

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();
  
  const searchData = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    url: `/blog/${post.slug}`,
    category: SITE_CONFIG.categories[post.data.category].displayName,
    tags: post.data.tags || []
  }));
  
  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

