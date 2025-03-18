import { parse } from "acorn";

export function lintFile(filePath) {
    const fs = require("fs");
    const code = fs.readFileSync(filePath, "utf-8");
    const ast = parse(code, { ecmaVersion: "latest" });

    const errors = [];

    errors.forEach(err => console.log(`[Erro] ${err.message}`));
    process.exit(errors.length > 0 ? 1 : 0);
}