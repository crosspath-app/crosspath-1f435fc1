import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    ssr: false,
    entry: {
      client: "src/main.tsx",
    },
  },
});
