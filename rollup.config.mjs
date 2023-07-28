import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: 'json' };

const banner = `/*!*/`;

const external = [
  // @ts-ignore
  ...Object.keys(pkg.optionalDependencies || {}),
  // @ts-ignore
  ...Object.keys(pkg.peerDependencies || {}),
  // @ts-ignore
  ...Object.keys(pkg.dependencies || {}),
];

export default {
  external: external,
  input: pkg.source,
  output: [
    pkg.main && {
      banner, file: pkg.main, format: "cjs", exports: "auto", plugins: [terser()],
    },
    pkg.module && {
      banner, file: pkg.module, format: "es", exports: "auto", plugins: [terser()],
    },
    pkg["umd:main"] && {
      banner,
      file: pkg["umd:main"],
      format: "umd",
      name: pkg.name.replace(/-./g, (match) => match[1].toUpperCase()),
      exports: "auto",
      globals: Object.fromEntries(
        external.map((dep) => [
          dep,
          dep.slice(1).replace(/-./g, (m) => m[1].toUpperCase()),
        ])
      ),
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), commonjs()],
};