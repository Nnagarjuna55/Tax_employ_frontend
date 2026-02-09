import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = ' - Smart Tax Solutions & Compliance | Income Tax, GST, MCA, SEBI',
  description = ' provides expert insights on Indian taxation, GST, Income Tax, MCA compliance, and SEBI regulations. Stay updated with latest tax news, articles, and judiciary updates.',
  keywords = 'tax, income tax, GST, MCA, SEBI, tax compliance, tax articles, tax news, Indian taxation, tax regulations, tax updates, tax portal, tax solutions',
  image = '/-logo.svg',
  url: urlProp,
  type = 'website',
  author = '',
  publishedTime,
  modifiedTime,
}) => {
  useEffect(() => {
    // Get current URL if not provided
    const currentUrl = urlProp || (typeof window !== 'undefined' ? window.location.href : 'https://.com');
    const fullImageUrl = image.startsWith('http') ? image : (typeof window !== 'undefined' ? `${window.location.origin}${image}` : `https://.com${image}`);

    // Update document title
    document.title = title;

    // Remove existing meta tags
    const removeMetaTag = (attribute: string, value: string) => {
      const existing = document.querySelector(`meta[${attribute}="${value}"]`);
      if (existing) {
        existing.remove();
      }
    };

    // Add or update meta tags
    const setMetaTag = (attribute: string, value: string, content: string) => {
      removeMetaTag(attribute, value);
      const meta = document.createElement('meta');
      meta.setAttribute(attribute, value);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };

    // Basic SEO Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', author);
    setMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'googlebot', 'index, follow');
    setMetaTag('name', 'language', 'English');
    setMetaTag('name', 'revisit-after', '1 day');

    // Open Graph Meta Tags (Facebook, LinkedIn, etc.)
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', '');
    setMetaTag('property', 'og:locale', 'en_IN');

    // Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // Article Meta Tags (if applicable)
    if (type === 'article') {
      if (publishedTime) {
        setMetaTag('property', 'article:published_time', publishedTime);
      }
      if (modifiedTime) {
        setMetaTag('property', 'article:modified_time', modifiedTime);
      }
      setMetaTag('property', 'article:author', author);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Cleanup function
    return () => {
      // Optionally clean up on unmount
    };
  }, [title, description, keywords, image, urlProp, type, author, publishedTime, modifiedTime]);

  return null;
};

export default SEOHead;
