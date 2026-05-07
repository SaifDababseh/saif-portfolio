"use client";

import { useState } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

export function ProjectImage({
  src, alt, width, height, fill, className, priority, objectFit = "cover",
}: ProjectImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-surface-3 border border-border",
        fill ? "absolute inset-0" : "",
        className
      )} style={!fill && width && height ? { width, height } : {}}>
        <div className="text-center px-6 py-4">
          <div className="w-10 h-10 border border-border-bright rotate-45 mx-auto mb-3 flex items-center justify-center">
            <div className="w-3 h-3 bg-neon-blue/20" />
          </div>
          <p className="font-mono text-xs text-text-muted">Image placeholder</p>
          <p className="font-mono text-[10px] text-text-muted/50 mt-1 max-w-[180px] leading-relaxed break-all">{src}</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <NextImage src={src} alt={alt} fill priority={priority}
        className={cn(`object-${objectFit}`, className)} onError={() => setError(true)} />
    );
  }

  return (
    <NextImage src={src} alt={alt} width={width || 800} height={height || 600}
      priority={priority} className={cn(`object-${objectFit}`, className)} onError={() => setError(true)} />
  );
}
