/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // SVG Configuration
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          typescript: true,
          dimensions: false
        }
      }]
    });
    return config;
  },
  // Enable importing images from assets folder
  images: {
    disableStaticImages: false,
  }
};

export default nextConfig;