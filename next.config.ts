import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Externalize pino and thread-stream from server bundling
  // These are Node.js-specific packages used by WalletConnect
  serverExternalPackages: ["pino", "pino-pretty", "thread-stream"],

  // Configure Turbopack (Next.js 16 uses Turbopack by default)
  turbopack: {
    resolveAlias: {
      // Replace pino with a browser-compatible stub
      pino: "pino/browser.js",
    },
  },
};

export default nextConfig;
