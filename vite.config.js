import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
  root: 'src',
  build: {
    outDir: '../dist'
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
          {
            src: "sections/",
            dest: "../dist",
          },
        ]
      })
    ]
};