import { SITE_CONFIG } from '@/config';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: Date;
  tags?: string[];
}

export function getSEO(props: SEOProps = {}) {
  const {
    title = SITE_CONFIG.title,
    description = SITE_CONFIG.description,
    image = '/og-image.jpg',
    article = false,
    publishedTime,
    tags = []
  } = props;

  const fullTitle = title === SITE_CONFIG.title ? title : `${title} | ${SITE_CONFIG.title}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      type: article ? 'article' : 'website',
      title: fullTitle,
      description,
      image,
      ...(article && publishedTime && {
        publishedTime: publishedTime.toISOString(),
        tags
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      image
    }
  };
}

