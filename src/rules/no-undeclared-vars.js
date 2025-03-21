export function noUndeclaredVarsRule(ast, errors) {
    const declaredVars = new Set();
    const globalVars = new Set([
        "console", "log", "warn", "error", "info", "table",
    ]);

    function traverse(node, parent) {
        if (!node || typeof node !== "object") return;

        if (node.type === "VariableDeclarator" && node.id?.name) {
            declaredVars.add(node.id.name);
        }

        if (
            node.type === "Identifier" &&
            parent?.type !== "VariableDeclarator" &&
            parent?.type !== "FunctionDeclaration" &&
            parent?.type !== "FunctionExpression" &&
            parent?.type !== "ArrowFunctionExpression"
        ) {
            // A diferença aqui está na verificação de variáveis globais
            if (!declaredVars.has(node.name) && !globalVars.has(node.name)) {
                errors.push({
                    message: `The variable '${node.name}' is being used but was not declared.`,
                });
            }
        }

        Object.entries(node).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(child => traverse(child, node));
            } else if (typeof value === "object") {
                traverse(value, node);
            }
        });
    }

    traverse(ast, null);
}