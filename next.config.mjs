/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
    // images: {
    //   domains: [
    //     "api.microlink.io", // Microlink Image Preview
    //   ],
  },
};

export default nextConfig;
