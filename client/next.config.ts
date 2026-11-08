import type { NextConfig } from "next";

// Client-side rendered SPA: `next build` emits static files to `out/`.
// cacheComponents / partialPrefetching were removed — they need the Node.js
// server runtime, which a static export doesn't have.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Default image optimization needs a server; YouTube thumbnails are served as-is.
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
