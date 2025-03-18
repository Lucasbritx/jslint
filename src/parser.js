import { parse } from "acorn";
import fs from "fs";
import { noConsoleRule } from "./rules/no-console.js";
import { noMultipleEmptyLinesRule } from "./rules/no-multiple-empty-lines.js";

export function lintFile(filePath) {
    const code = fs.readFileSync(filePath, "utf-8");
    const ast = parse(code, { ecmaVersion: "latest" });

    const errors = [];
    noConsoleRule(ast, errors);
    noMultipleEmptyLinesRule(code, errors);

    errors.forEach(err => console.log(`[Erro] ${err.message}`));
    process.exit(errors.length > 0 ? 1 : 0);
}