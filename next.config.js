/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
