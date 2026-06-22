import {
  SITE_DOMAIN,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  OG_IMAGE_PATH,
  CLOUDFLARE_IMAGES_BASE,
  HERO_IMAGE_ID,
} from './constants';

export interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  author?: string;
}

export function generateMetaTags(props: SEOMetaProps) {
  const {
    title = SITE_NAME,
    description = SITE_DESCRIPTION,
    image = `${CLOUDFLARE_IMAGES_BASE}/${HERO_IMAGE_ID}/public`,
    url = SITE_URL,
    type = 'website',
    author = SITE_NAME,
  } = props;

  return {
    title: `${title} | Premium Domain for Sale`,
    description,
    openGraph: {
      title: `${title} — Premium Domain`,
      description,
      image,
      url,
      type,
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${title} — Premium Domain`,
      description,
      image,
      creator: '@voiceversehub',
    },
    canonical: url,
  };
}

export function generateJSONLD(
  type: 'Organization' | 'WebPage' | 'WebSite',
  data: any,
) {
  const baseOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: 'sales@desertrich.com',
  };

  if (type === 'Organization') {
    return baseOrg;
  }

  if (type === 'WebSite') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${SITE_NAME} — ${SITE_DOMAIN}`,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  }

  if (type === 'WebPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.title || SITE_NAME,
      description: data.description || SITE_DESCRIPTION,
      url: data.url || SITE_URL,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
    };
  }

  return baseOrg;
}
