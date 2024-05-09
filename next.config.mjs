/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "is.gd",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
