// Putting all non related function in here because I'm lazy
import path from "path";
import fetch from "node-fetch";
import * as fs from "fs";
import { off } from "process";

export async function verifyImportForDay(
    year: string,
    day: string,
    sessionCookie: string
): Promise<void> {
    console.log(`Verifying input for year ${year}, day ${day}...`);
    const filePath = path.join(__dirname, "..", year, day, "input.txt");
    if (fs.existsSync(filePath)) {
        console.log(`Input file for day ${day} exists.`);
    } else {
        console.log(
            `Input file for day ${day} does not exist. Fetching from website...`
        );
        if (sessionCookie === undefined)
            throw new Error(
                "Session cookie is undefined, to automatically fetch input you must provide a session cookie."
            );
        const input = await fetchInput(year, day, sessionCookie);
        fs.writeFileSync(filePath, input, "utf-8");
        console.log(`Input file for day ${day} has been fetched and saved.`);
    }
}

async function fetchInput(
    year: string,
    day: string,
    sessionCookie: string
): Promise<string> {
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const options = {
        method: "GET",
        headers: { "User-Agent": "AOC Runner", cookie: `session=${sessionCookie}` },
    };
    const input = await fetch(url, options).then((res) => res.text());
    if (input.includes("Please don't repeatedly request this endpoint before it unlocks!")){
        throw new Error("Input not available yet, please wait until the day unlocks.")
    }
    return input;
}
