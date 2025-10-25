import { cn } from "@/lib/utils";
import type { Experimental_GeneratedImage } from "ai";
import Image from 'next/image';

export type ImageProps = Experimental_GeneratedImage & {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export const GeneratedImage = ({
  base64,
  mediaType = 'image/png',
  alt = 'Generated image',
  width = 512,
  height = 512,
  className,
  ...props
}: ImageProps) => {
  if (!base64) return null;
  
  const src = `data:${mediaType};base64,${base64}`;
  
  return (
    <div className={cn("relative h-auto w-full overflow-hidden rounded-md", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-contain"
        unoptimized={true} // Required for data URLs
        {...props}
      />
    </div>
  );
};
