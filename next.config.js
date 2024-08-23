/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@azure/storage-blob"],
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "nextApp", // The name of your federated app
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./ChatLayout": "./app/(authenticated)/chat/layout.tsx", // Expose the chat layout
          "./ChatPage": "./app/(authenticated)/chat/page.tsx", // Expose the chat page
          "./ChatLoading": "./app/(authenticated)/chat/loading.tsx", // Expose the chat loading component
          "./ChatIdLayout": "./app/(authenticated)/chat/[id]/layout.tsx", // Expose the chat/[id] layout
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
