
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        general: resolve(__dirname, 'src/general.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            // copie fichiers csv
            src: "data/",
            dest: "../dist",
          },
          { 
            // copie fichiers dans assets
            src: "assets/",
            dest: "../dist",
          },
        ]
      })
    ]
});