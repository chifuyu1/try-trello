import path from "path";
// @rollup
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
// rollup
import svelte from "rollup-plugin-svelte";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";
import globals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";
import autoprefixer from "autoprefixer";
// external
import sveltePreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
      css: (css) => {
        css.write("bundle.css");
      },
      preprocess: sveltePreprocess({ postcss: { plugins: [autoprefixer()] } }),
    }),
    css({ output: "bundle.css" }),
    replace({
      values: {
        "crypto.randomBytes": 'require("randombytes");',
      },
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    globals(),
    builtins(),
    alias({
      entries: [{ find: "~", replacement: path.resolve(__dirname, "src/") }],
    }),

    !production && serve(),
    !production && livereload("public"),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
