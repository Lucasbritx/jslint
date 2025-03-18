export function noMultipleEmptyLinesRule(code, errors) {
    const lines = code.split("\n");

    let emptyLineCount = 0;
    lines.forEach((line, index) => {
        if (line.trim() === "") {
            emptyLineCount++;
            if (emptyLineCount > 1) {
                errors.push({
                    message: `Line ${index + 1}: Not allowed multiple empty lines.`,
                });
            }
        } else {
            emptyLineCount = 0;
        }
    });
}