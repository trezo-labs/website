import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    qualities: [100],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
