/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
  },
  async rewrites() {
    return [
      {
        source: `/data/:path*`,
        destination: `${process.env.NEXT_PUBLIC_URL}/data/:path*`,
      },
      {
        source: `/upload/:path*`,
        destination: `${process.env.NEXT_PUBLIC_API_URL}/upload/:path*`,
      },
      { source: `/token/:path*`, destination: `https://merchant.upay.al/token/:path*` },
    ];
  },
  i18n,
};

module.exports = nextConfig;
