import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js', // Your entry file
  output: [
    {
      file: 'dist/bundle.cjs', // Output for CommonJS
      format: 'cjs',
      sourcemap: true, // Include sourcemaps
    },
    {
      file: 'dist/bundle.esm.js', // Output for ES Modules
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // Resolves `node_modules`
    commonjs(), // Converts CommonJS modules to ES modules
    json(), // Supports importing JSON files
    babel({
      babelHelpers: 'bundled', // Use Babel helpers directly in the bundle
      exclude: 'node_modules/**', // Exclude dependencies from being transpiled
    }),
  ],
};
