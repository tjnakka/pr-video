/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/onboarding",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
