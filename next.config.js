/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ['linkstagram-api-prod.fra1.digitaloceanspaces.com'],
  },
};

module.exports = nextConfig;
