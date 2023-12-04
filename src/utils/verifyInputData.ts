import fetch from "node-fetch";
import * as fs from "fs";
import { AOCFiles, createFilePathForDay } from "./fileUtils";

export async function verifyImportForDay(
    year: string,
    day: string,
    sessionCookie: string
): Promise<void> {
    console.log(`Verifying input for year ${year}, day ${day}...`);
    const filePath = createFilePathForDay(year, day, AOCFiles.INPUT);
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

    // This could probably be handled better
    if (input.includes("Please don't repeatedly request this endpoint before it unlocks!")){
        throw new Error("Error getting input. Input not available yet, please wait until the day unlocks.")
    }

    if (input.includes("Puzzle inputs differ by user.  Please log in to get your puzzle input.")) {
        throw new Error("Error getting input. Session cookie is invalid, please provide a valid session cookie.")
    }

    return input;
}
