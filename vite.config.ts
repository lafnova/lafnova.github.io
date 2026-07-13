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
  nitro: false,
  vite: {
    environments: {
      client: { build: { outDir: ".output/public" } },
      server: { build: { outDir: ".output/server" } },
    },
  },
});
