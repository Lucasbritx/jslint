export function noConsoleRule(ast, errors) {
    function traverse(node) {
        if (node.type === "CallExpression" && node.callee.object?.name === "console") {
            errors.push({ message: "Avoid console.log()" });
        }
        for (const key in node) {
            if (typeof node[key] === "object" && node[key] !== null) {
                traverse(node[key]);
            }
        }
    }
    traverse(ast);
}