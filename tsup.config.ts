import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'lib',
  format: 'cjs',
  dts: true,
  sourcemap: true,
  clean: true,
  external: [],
});
