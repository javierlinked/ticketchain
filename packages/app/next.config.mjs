/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    remotePatterns: [
      // IPFS gateways for NFT metadata and images
      { protocol: 'https', hostname: 'ipfs.io' },
      { protocol: 'https', hostname: '**.ipfs.dweb.link' },
      { protocol: 'https', hostname: 'cloudflare-ipfs.com' },
      { protocol: 'https', hostname: '**.ipfs.w3s.link' },
      // Add other specific domains as needed
    ],
  },
}

export default nextConfig
