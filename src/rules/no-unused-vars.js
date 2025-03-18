
//TODO NOT WORKING YET
export function noUnusedVarsRule(ast, errors) {
    const declaredVars = new Set();

    ast.body.forEach(node => {
        if (node?.type === "VariableDeclaration") {
            node?.declarations?.forEach(declaration => {
                declaredVars.add(declaration?.id?.name);
            });
        }
    });

    ast.body.forEach(node => {
        if (node?.type === "Identifier" && !declaredVars.has(node?.name)) {
            errors.push({
                message: `The variable '${node.name}' isn't used.`,
                line: node?.loc?.start?.line,
                column: node?.loc?.start?.column
            });
        }
    });
}