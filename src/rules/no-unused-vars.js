export function noUnusedVarsRule(ast, errors) {
    const declaredVars = new Set();
    const usedVars = new Set();

    function traverse(node, parent) {
        if (!node || typeof node !== "object") return;

        // Se for uma declaração de variável, adiciona ao conjunto de declaradas
        if (node.type === "VariableDeclarator" && node.id?.name) {
            declaredVars.add(node.id.name);
        }

        // Se for um identificador e estiver sendo usado (fora de uma declaração de variável)
        if (
            node.type === "Identifier" &&
            parent?.type !== "VariableDeclarator" && // Ignora quando está sendo declarado
            parent?.type !== "FunctionDeclaration" && // Evita falsos positivos em funções
            parent?.type !== "FunctionExpression" &&
            parent?.type !== "ArrowFunctionExpression"
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

    // Variáveis declaradas mas não utilizadas
    declaredVars.forEach(varName => {
        if (!usedVars.has(varName)) {
            errors.push({
                message: `The variable '${varName}' is declared but never used.`,
            });
        }
    });
}