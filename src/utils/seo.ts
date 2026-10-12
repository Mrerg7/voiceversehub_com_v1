import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  CLOUDFLARE_IMAGES_BASE,
  HERO_IMAGE_ID,
} from "./constants";

export interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedDate?: string;
  author?: string;
}

export function generateMetaTags(props: SEOMetaProps) {
  const {
    title = "voiceversehub.com",
    description = SITE_DESCRIPTION,
    image = `${CLOUDFLARE_IMAGES_BASE}/${HERO_IMAGE_ID}/public`,
    url = SITE_URL,
    type = "website",
    author = SITE_NAME,
  } = props;

  return {
    title: title.includes("Premium Domain") ? title : `${title} | Premium Domain for Sale | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} — Premium Domain`,
      description,
      image,
      url,
      type,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} — Premium Domain`,
      description,
      image,
      creator: "@voiceversehub",
    },
    canonical: url,
    author,
  };
}

export function generateJSONLD(type: "Organization" | "WebPage" | "WebSite" | "Product", data: Record<string, string> = {}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: "sales@desertrich.com",
  };

  if (type === "Organization") return organization;

  if (type === "WebSite") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${SITE_NAME} — voiceversehub.com`,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    };
  }

  if (type === "Product") {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "voiceversehub.com",
      category: "Premium domain name",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      brand: { "@type": "Brand", name: SITE_NAME },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        description: "Price on request. Escrow transfer available.",
        url: `${SITE_URL}/#inquire`,
        seller: organization,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title || SITE_NAME,
    description: data.description || SITE_DESCRIPTION,
    url: data.url || SITE_URL,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}
