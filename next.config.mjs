/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freetogame.com",
        port: "",
        pathname: "/g/**",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      },
    ],
  },
};

export default nextConfig;
