import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
      routes: ["/"],
    },
    pages: [{ path: "/" }],
  },
  nitro: {
    preset: "static",
    output: { dir: ".output", publicDir: ".output/public", serverDir: ".output/server" },
  },
});
