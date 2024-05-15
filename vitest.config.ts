import vue from "@vitejs/plugin-vue";
import path from 'path';
import { defineConfig } from "vite";
import { defineConfig as defineVitestConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, '.'),
      },
    },
  }),
  defineVitestConfig({
    test: {
      coverage: {
        enabled: true,
        reporter: ["text", "json", "html"],
      },
      environment: "jsdom",
      globals: true,
    },
  }),
);
