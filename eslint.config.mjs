import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude keeps independent Git worktrees (including their own build
    // artifacts) under this repository. They are not part of this worktree's
    // lint boundary and can otherwise make a root lint traverse several
    // complete applications.
    ".claude/**",
  ]),
]);

export default eslintConfig;
