import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }],
  },
  async redirects() {
    // Old SPA routes from the Vite site
    return [
      { source: '/project/mascot-identity-viby', destination: '/work/mascot-identity-design-viby-international-school', permanent: true },
      { source: '/work/mascot-identity-viby', destination: '/work/mascot-identity-design-viby-international-school', permanent: true },
      { source: '/project/:slug', destination: '/work/:slug', permanent: true },
    ]
  },
}

export default nextConfig
