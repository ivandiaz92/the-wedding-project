/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.BUILD_FOR_GITHUB_PAGES === '1'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  reactStrictMode: true,
  output: isGitHubPages ? 'export' : 'standalone',
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  transpilePackages: ['@shadergradient/react'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost'],
  },
}

module.exports = nextConfig 