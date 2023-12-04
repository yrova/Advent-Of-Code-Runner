import fetch from "node-fetch";

export class AOCService {

    private readonly baseUrl = "https://adventofcode.com";

    public async fetchInput(year: string, day: string, sessionCookie: string): Promise<string> {
        const url = `${this.baseUrl}/${year}/day/${day}/input`;
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
}