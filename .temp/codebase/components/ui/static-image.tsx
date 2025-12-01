import Image, { ImageProps } from 'next/image';
import { siteConfig } from '@/config/site';

export function StaticImage({
  src,
  alt,
  ...props
}: Omit<ImageProps, 'alt'> & { alt: string }) {
  // Handle absolute URLs
  if (typeof src === 'string' && (src.startsWith('http') || src.startsWith('//'))) {
    return <Image src={src} alt={alt} {...props} />;
  }

  // Handle static assets
  const basePath = process.env.NEXT_PUBLIC_APP_URL || '';
  const imageSrc = typeof src === 'string' && src.startsWith('/')
    ? `${basePath}${src}`
    : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      {...props}
    />
  );
}
