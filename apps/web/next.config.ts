import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? "/Mahabharata-AI" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/Mahabharata-AI/" : "",
};

export default nextConfig;
