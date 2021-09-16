import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "assets/socket_illustration_0.svg",
        "assets/socket_illustration_1.svg",
      ],
      manifest: {
        name: "Link Room",
        short_name: "Link Room",
        description: "All your links in one room!",
        theme_color: "#3B82F6",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        related_applications: [
          {
            platform: "webapp",
            url: "http://localhost:5000/manifest.webmanifest",
          },
        ],
      },
    }),
  ],
});
