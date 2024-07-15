import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: ['./lib/index.ts'],
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'lib',
        exports: 'named',
      }
    }
  }
})