"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import { StaticImage } from "@/components/ui/static-image";
import type { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type BlurImageProps = Omit<ImageProps, 'alt'> & {
  alt?: string;
};

export default function BlurImage(props: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <StaticImage
      {...props}
      alt={props.alt || ''}
      className={cn(
        props.className,
        "duration-500 ease-in-out",
        isLoading ? "blur-sm" : "blur-0",
      )}
      onLoad={() => setLoading(false)}
    />
  );
}
