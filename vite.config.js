import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Enable PWA features in dev mode for testing
      },
      workbox: {
        // Cache these file types for offline use
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      },
      manifest: {
        name: "Todo List",
        short_name: "Todos",
        description: "A simple todo list app to manage your tasks",
        theme_color: "#ffffff", // Match your app's purple theme
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "public/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            // purpose: "any maskable",
          },
          {
            src: "public/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            // purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0", // Allow access from any network device
    port: 5173, // Default port (optional)
  },
});
