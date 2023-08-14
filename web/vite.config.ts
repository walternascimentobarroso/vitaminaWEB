import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/react-tailwind",
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "wdashboard",
      fileName: (format) => `wdashboard.${format}.js`,
    },
    rollupOptions: {
      // Faça a lista de dependências externas que você não quer incluir na biblioteca.
      external: ["react", "react-dom"],
      output: {
        // Nomeie a variável global usada quando a biblioteca é carregada em um ambiente não ES.
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
