import path from "path";

export enum AOCFiles {
    INPUT = "input.txt",
    RUNNER = "runner.ts",
}
export function createFilePathForDay(year: string, day: string, fileName: string, baseDir = __dirname): string {
    const paddedDay = String(day).padStart(2, "0");
    const yearDayPath = `Y${year}/D${paddedDay}`;
    return path.join(baseDir, "..", yearDayPath, fileName);
}