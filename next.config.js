/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        port: '3001',
      },
    ],
  },
}

module.exports = nextConfig
