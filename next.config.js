/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', 
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['playwright', 'puppeteer'],
  },
}

module.exports = nextConfig