import svelte from "rollup-plugin-svelte";
import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import autoPreprocess from "svelte-preprocess";
import copy from 'rollup-plugin-copy';
const TEST_VAULT = 'test-vault/.obsidian/plugins/obsidian-flashcards';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist/',
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default'
  },
  external: ['obsidian', "fs", "os", "path"],
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
    }),
    typescript(),
    nodeResolve({browser: true, dedupe: ["svelte"],}),
    commonjs({include: "node_modules/**",}),
    copy({
      targets: [
        { src: 'dist/main.js', dest: TEST_VAULT },
        { src: ['manifest.json', 'styles.css'], dest: TEST_VAULT }
      ], flatten: true
    })
  ]
};