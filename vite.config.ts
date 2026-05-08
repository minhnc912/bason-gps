import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
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
    server: {
        host: "bacson-gps.app",
        port: 5173,
        strictPort: true,
        https: {
            key: fs.readFileSync("C:/laragon/etc/ssl/laragon.key"),
            cert: fs.readFileSync("C:/laragon/etc/ssl/laragon.crt"),
        },
        hmr: {
            host: "bacson-gps.app",
        },
    },
});
