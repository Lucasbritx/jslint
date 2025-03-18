export function noTrailingEmptyLinesRule(code, errors) {
    const lines = code.split("\n");

    let lastNonEmptyLine = lines.length - 1;
    while (lastNonEmptyLine >= 0 && lines[lastNonEmptyLine].trim() === "") {
        lastNonEmptyLine--;
    }

    if (lastNonEmptyLine < lines.length - 1) {
        errors.push({
            message: `The file has empty lines in the end.`,
        });
    }
}