/**
 * Public asset path. When deployed to GitHub Pages (NEXT_PUBLIC_SITE_ORIGIN +
 * NEXT_PUBLIC_BASE_PATH set), returns absolute URL so images and assets load
 * correctly. Otherwise returns the path as-is for local/dev.
 */
export function getPublicPath(path: string): string {
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || ''
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  if (origin && base) return `${origin}${base}${path.startsWith('/') ? path : `/${path}`}`
  return path
}
