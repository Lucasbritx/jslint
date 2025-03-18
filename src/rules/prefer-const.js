export function preferConstRule(ast, errors) {
    ast.body.forEach(node => {
        if (node.type === "VariableDeclaration") {
            node.declarations.forEach(declaration => {
                if (declaration.init && node.kind === "let") {
                    const line = node?.loc?.start?.line;
                    const column = node?.loc?.start?.column;
                    errors.push({
                        message: `Use 'const' instead 'let' for no reassigned variables.`,
                        line: line,
                        column: column
                    });
                }
            });
        }
    });
}