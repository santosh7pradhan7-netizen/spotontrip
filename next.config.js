// next.config.js - CLEAN & SIMPLIFIED CONFIG

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'experimental' block entirely to stop the warning

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', 
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
    ],
  },
};

module.exports = nextConfig;