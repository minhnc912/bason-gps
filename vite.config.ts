import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig(({ command }) => {
    // Kiểm tra xem có đang ở môi trường local và có file SSL không
    const keyPath = "C:/laragon/etc/ssl/laragon.key";
    const certPath = "C:/laragon/etc/ssl/laragon.crt";
    const isLocal = fs.existsSync(keyPath) && command === "serve";

    return {
        plugins: [
            laravel({
                input: ["resources/js/main.tsx"],
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                "@": "/resources/js",
            },
        },
        // Nếu là môi trường build (Railway), server sẽ là undefined hoặc cấu hình cơ bản
        server: isLocal
            ? {
                  host: "bacson-gps.app",
                  port: 5173,
                  strictPort: true,
                  https: {
                      key: fs.readFileSync(keyPath),
                      cert: fs.readFileSync(certPath),
                  },
                  hmr: {
                      host: "bacson-gps.app",
                  },
              }
            : {
                  // Cấu hình tối giản cho production/build
                  host: true,
                  hmr: {
                      host: "localhost",
                  },
              },
    };
});
