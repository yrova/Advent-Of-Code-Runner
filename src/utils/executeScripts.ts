import path from "path";
import * as fs from "fs";

export async function executeScript(year: string, day: string) {
    const filePath = path.join(__dirname, "..", year, day, "runner.ts");
    const inputFilePath = path.join(__dirname, "..", year, day, "input.txt");
    try {
        const dayModule = await import(filePath);
        if (dayModule && dayModule.runner) {
            const input = fs.readFileSync(inputFilePath, "utf8");
            console.log('Running script for day', day)
            await dayModule.runner(input);
        } else {
            console.error(`Runner function not found in ${filePath}`);
        }
    } catch (error) {
        console.error(`Error loading module: ${filePath}`, error);
    }
}
