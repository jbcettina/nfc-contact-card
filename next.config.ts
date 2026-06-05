import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this project. A stray lockfile in a parent directory
  // would otherwise make Turbopack guess the wrong workspace root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
