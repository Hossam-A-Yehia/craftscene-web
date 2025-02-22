import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      all: true,
      exclude: [
        ".next",
        "node_modules/",
        "src/utils",
        "next.config.ts",
        "postcss.config.mjs",
        "tailwind.config.ts",
        "src/hooks",
        "src/config",
        "src/il8n",
        "src/services",
        "src/types",
        "src/pages/api/auth",
        "src/app/layout.tsx",
        "src/app/login/page.tsx",
        "src/app/register/page.tsx",
        "src/app/login/page.tsx",
        "src/app/register/page.tsx",
        "src/components/pages",
        "src/components/templates/AuthPage/Resgister.tsx",
        "src/app",
      ],
    },
  },
});
