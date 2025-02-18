import cssValidator from 'w3c-css-validator';
import fs from 'fs/promises';

try {
    console.log("Validating CSS");
    const readCssFile = await fs.readFile('./src/sounddark.css', 'utf-8');
    const result = await cssValidator.validateText(readCssFile, {
        warningLevel: 0
    });
    if (result.valid) {
        console.log("CSS is valid");
    } else {
        console.error("CSS is not valid");
        for (let error of result.errors) {
            console.error(
                "Line " + error.line + ":",
                error.message
            );
        }
        process.exit(1);
    }
} catch (e) {
    console.error("Cannot validate css", e);
    process.exit(1);
}