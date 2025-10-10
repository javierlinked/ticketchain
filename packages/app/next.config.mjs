/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  
  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    
    // Suppress warnings for React Native dependencies that aren't needed for web
    config.ignoreWarnings = [
      { module: /node_modules\/@metamask\/sdk/ },
      { message: /Can't resolve '@react-native-async-storage\/async-storage'/ },
    ]
    
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
