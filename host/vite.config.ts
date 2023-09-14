/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { federation } from '@module-federation/vite';
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    publicDir: 'src/public',

    build: {
      target: ['es2020'],
    },
    plugins: [
      federation({
        options: {
          workspaceRoot: __dirname,
          outputPath: '../dist/host',
          tsConfig: 'tsconfig.app.json',
          federationConfig: 'federation.config.js',
          verbose: false,
          dev: command === 'serve',
        },
        adapter: createEsBuildAdapter({plugins:[]}), // TODO: how to set this parameter ?
      }),
      analog(),
      tsConfigPaths({
        root: '../',
      }),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    }
  };
});
