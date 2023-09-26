/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { federation } from '@module-federation/vite';
import * as esbuild from 'esbuild';
import { createAngularBuildAdapter } from "@angular-architects/native-federation/src/utils/angular-esbuild-adapter";
import * as path from "path";

export const builderOptions = {
    optimization: false,
    sourceMap: true,
    fileReplacements: [],
    preserveSymlinks: undefined,
    stylePreprocessorOption: { includePaths: [] },
    inlineStyleLanguage: 'css',
}

const context = {
    workspaceRoot: path.join(__dirname, '..'),
    logger: console.log, // TODO
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
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
          tsConfig: 'host/tsconfig.app.json',
          federationConfig: './federation.config.js',
          verbose: true,
          dev: command === 'serve',
        },
        adapter: createAngularBuildAdapter(builderOptions, context),
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
