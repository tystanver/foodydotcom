/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["cdn.pixabay.com","cloudflare-ipfs.com"],
    },
  }

module.exports = nextConfig
