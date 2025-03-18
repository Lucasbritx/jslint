export function noVarRule(ast, errors) {
    ast.body.forEach(node => {
        if (node?.type === "VariableDeclaration" && node?.kind === "var") {
            errors.push({
                message: "Avoid using 'var'. Use 'let' or 'const' instead.",
                line: node?.loc?.start?.line,
                column: node?.loc?.start?.column
            });
        }
    });
}