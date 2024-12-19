import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts', // Your entry file
    output: [
      {
        file: 'dist/bundle.cjs', // Output for CommonJS
        format: 'cjs',
        sourcemap: false // Include sourcemaps
      },
      {
        file: 'dist/bundle.esm.js', // Output for ES Modules
        format: 'esm',
        sourcemap: false
      }
    ],
    plugins: [
      postcss({
        extract: true,
        plugins: []
      }),
      resolve(), // Resolves `node_modules`
      commonjs(), // Converts CommonJS modules to ES modules
      json(), // Supports importing JSON files
      peerDepsExternal(), // Exclude peer dependencies
      typescript({
        // Add Rollup's TypeScript plugin
        declarationDir: 'dist',
        tsconfig: './tsconfig.json' // Specify your TypeScript configuration file
      })
    ]
  },
  {
    input: 'src/index.d.ts', // Generated declaration entry point
    output: {
      file: 'dist/index.d.ts', // Final output location for .d.ts
      format: 'es'
    },
    plugins: [dts()]
  }
];
