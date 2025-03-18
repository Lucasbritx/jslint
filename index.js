import { parse } from "acorn";

const ast = parse("const x = 10;", { ecmaVersion: "latest" });
console.log(ast);