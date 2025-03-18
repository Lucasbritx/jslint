import { lintFile } from "../src/parser.js";

const file = process.argv[2];
if (!file) {
    console.error("Erro: Nenhum arquivo especificado.");
    process.exit(1);
}

lintFile(file);