import * as fs from "fs";
import {AOCFiles, createFilePathForDay} from "./fileUtils";

export async function executeScript(year: string, day: string) {
    const filePath = createFilePathForDay(year, day, AOCFiles.RUNNER);
    const inputFilePath = createFilePathForDay(year, day, AOCFiles.INPUT);
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
