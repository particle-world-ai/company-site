import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Relative assets support both a custom domain and GitHub Pages project URLs.
export default defineConfig({
  base: './',
  build: {
    rolldownOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        updates: fileURLToPath(new URL('./updates/index.html', import.meta.url)),
      },
    },
  },
  plugins: [{
    name: 'site-distribution-files',
    generateBundle() {
      for (const fileName of [
        'CNAME',
        'assets/fonts/OFL-NotoSerifSC.txt',
        'assets/fonts/OFL-SourceSerif4.txt',
        'assets/fonts/OFL-IBMPlexMono.txt',
      ]) {
        this.emitFile({
          type: 'asset',
          fileName,
          source: readFileSync(new URL(fileName, import.meta.url)),
        });
      }
      this.emitFile({ type: 'asset', fileName: '.nojekyll', source: '' });
    },
  }],
});
