import { CLOUDFLARE_IMAGES_BASE } from './constants';

export interface CFImageProps {
  id: string;
  alt: string;
  width?: number;
  height?: number;
  format?: 'auto' | 'webp' | 'avif' | 'json';
  quality?: number;
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
  gravity?: string;
}

/**
 * Generate Cloudflare Images URL with transformations
 */
export function getCFImageUrl(
  id: string,
  options: Partial<CFImageProps> = {},
) {
  const {
    width,
    height,
    format = 'auto',
    quality = 80,
    fit = 'cover',
  } = options;

  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('fit', fit);
  params.append('quality', quality.toString());
  params.append('format', format);

  const baseUrl = `${CLOUDFLARE_IMAGES_BASE}/${id}/public`;
  const queryString = params.toString();

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Generate srcset for responsive images
 */
export function getCFImageSrcSet(
  id: string,
  widths: number[] = [320, 640, 1024, 1280],
) {
  return widths
    .map((w) => `${getCFImageUrl(id, { width: w })} ${w}w`)
    .join(', ');
}
