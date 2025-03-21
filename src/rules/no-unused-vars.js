export function noUnusedVarsRule(ast, errors) {
    const declaredVars = new Set();
    const usedVars = new Set();

    function traverse(node, parent) {
        if (!node || typeof node !== "object") return;

        // Captura todas as variáveis declaradas
        if (node.type === "VariableDeclarator" && node.id?.name) {
            declaredVars.add(node.id.name);
        }

        // Verifica se a variável é usada
        if (
            node.type === "Identifier" &&
            parent?.type !== "VariableDeclarator" && // Não conta a declaração
            parent?.type !== "FunctionDeclaration" &&
            parent?.type !== "FunctionExpression" &&
            parent?.type !== "ArrowFunctionExpression"
        ) {
            usedVars.add(node.name);
        }

        // Verifica se está sendo usada como atribuição
        if (
            parent?.type === "AssignmentExpression" && parent.right === node ||
            parent?.type === "VariableDeclarator" && parent.init === node
        ) {
            usedVars.add(node.name);
        }

        // Percorre recursivamente todos os nós filhos
        Object.entries(node).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(child => traverse(child, node));
            } else if (typeof value === "object") {
                traverse(value, node);
            }
        });
    }

    traverse(ast, null);

    declaredVars.forEach(varName => {
        if (!usedVars.has(varName)) {
            errors.push({
                message: `The variable '${varName}' is declared but never used.`,
            });
        }
    });
}