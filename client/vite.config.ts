import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_CALENDLY_URL: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    root: ".",
    resolve: {
      alias: {
        "@/": path.resolve(__dirname, "src"),
      },
    },
    esbuild: {
      drop: ["debugger"],
      pure: ["console.log"],
    },
  };
});
