import Image, { type ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "placeholder"> {
  /** Enable blur placeholder with a custom blurDataURL or default shimmer */
  blurPlaceholder?: boolean;
  /** Custom blur data URL - if not provided, a shimmer SVG is generated */
  blurDataURL?: string;
}

/**
 * Shimmer SVG generator for blur placeholder.
 * Creates a subtle animated shimmer effect as the image loads.
 */
function generateShimmer(width: number, height: number): string {
  const shimmerSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f0ebe4" />
          <stop offset="50%" stop-color="#faf8f5" />
          <stop offset="100%" stop-color="#f0ebe4" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shimmer)" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(shimmerSvg).toString("base64")}`;
}

/**
 * OptimizedImage - a wrapper around next/image for consistent image optimization.
 *
 * Features:
 * - Blur placeholder support (shimmer effect by default)
 * - Lazy loading enabled by default
 * - Proper width/height enforcement for CLS prevention
 * - WebP served automatically by Next.js image optimization
 */
export function OptimizedImage({
  blurPlaceholder = true,
  blurDataURL: customBlurDataURL,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const width = typeof props.width === "number" ? props.width : 800;
  const height = typeof props.height === "number" ? props.height : 600;

  const placeholderProps = blurPlaceholder
    ? {
        placeholder: "blur" as const,
        blurDataURL: customBlurDataURL ?? generateShimmer(width, height),
      }
    : {};

  return (
    <Image
      loading={loading}
      sizes={props.sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      {...placeholderProps}
      {...props}
    />
  );
}
