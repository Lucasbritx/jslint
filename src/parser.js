import { parse } from "acorn";
import fs from "fs";
import { noConsoleRule } from "./rules/no-console.js";
import { noMultipleEmptyLinesRule } from "./rules/no-multiple-empty-lines.js";
import { noTrailingEmptyLinesRule } from "./rules/no-trailing-empty-lines.js";
import { noVarRule } from "./rules/no-var-rule.js";
import { noUnusedVarsRule } from "./rules/no-unused-vars.js";
import { preferConstRule } from "./rules/prefer-const.js";

export function lintFile(filePath) {
    const code = fs.readFileSync(filePath, "utf-8");
    const ast = parse(code, { ecmaVersion: "latest" });

    const errors = [];
    noConsoleRule(ast, errors);
    noMultipleEmptyLinesRule(code, errors);
    noTrailingEmptyLinesRule(code, errors);
    noVarRule(ast, errors);
    noUnusedVarsRule(ast, errors);
    preferConstRule(ast, errors);
    // TODO add no declared variable trying to be used

    errors.forEach(err => console.log(`[Erro] ${err.message}`));
    process.exit(errors.length > 0 ? 1 : 0);
}