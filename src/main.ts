import yargs from "yargs";
import { env } from "./environment";
import {AOCFiles, createFilePathForDay} from "./utils/fileUtils";
import fs from "fs";
import {AOCService} from "./services/AOCService";

export class AdventOfCodeRunner {
    private readonly day: number;
    private readonly year: number;
    private readonly sessionCookie: string;
    private readonly aocService: AOCService;

    public constructor(args: any) {
        this.day = args.day || env.DAY;
        this.year = args.year || env.YEAR;
        this.sessionCookie = args.sessionCookie || env.SESSION_COOKIE;
        this.aocService = new AOCService();

        console.table({
            day: this.day,
            year: this.year,
            sessionCookie: this.sessionCookie,
        });
    }

    async run() {
        console.log(`Running script for Year: ${this.year}, Day: ${this.day}...`);
        await this.validateTestDataForDay(
            this.year.toString(),
            this.day.toString(),
            this.sessionCookie
        );
        await this.executeScript(this.year.toString(), this.day.toString());
    }

    /**
     * Validates the test data for a given day of the year.
     *
     * @param year The year as a string, to identify the specific dataset.
     * @param day The day as a string, to locate the relevant data.
     * @param sessionCookie A string representing the session cookie needed for data retrieval.
     * @throws Will throw an error if the session cookie is undefined.
     *
     * This function checks if the input file for the specified day exists locally.
     * If not, it attempts to fetch the data from a website using the provided session cookie.
     * The fetched data is then saved locally for future use.
     */

    async validateTestDataForDay(
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

            const input = await this.aocService.fetchInput(year, day, sessionCookie);
            fs.writeFileSync(filePath, input, "utf-8");
            console.log(`Input file for day ${day} has been fetched and saved.`);
        }
    }

    /**
     * Executes a script for a specific day of the year.
     *
     * @param year The year as a string, to identify the dataset.
     * @param day The day as a string, to specify which script to run.
     *
     * This function attempts to load and execute a script from a local file path.
     * It first constructs file paths to the script (runner) and its input data,
     * then tries to import the script module and run it with the input data.
     * Errors are logged if the runner function is not found or if there are issues loading the module.
     */
    async executeScript(year: string, day: string) {
        const filePath = createFilePathForDay(year, day, AOCFiles.RUNNER);
        const inputFilePath = createFilePathForDay(year, day, AOCFiles.INPUT);
        const dayModule = await import(filePath);
        if (dayModule && dayModule.runner) {
            const input = fs.readFileSync(inputFilePath, "utf8");
            console.log('Running script for day', day)
            await dayModule.runner(input);
        } else {
            throw new Error(`Error loading module. Runner function not found in ${filePath}`);
        }
    }
}

if (require.main === module) {
    const args = yargs
        .option("day", {
            alias: "d",
            describe: "The day of advent of code to run",
            type: "number",
        })
        .option("year", {
            alias: "y",
            describe: "Year of advent of code to run",
            type: "number",
        })
        .option("sessionCookie", {
            alias: "c",
            describe: "Session cookie for fetching input",
            type: "string",
        })
        .help()
        .alias("help", "h").argv;

    main(args).catch((err) => {
        console.error(err);
    });
}

export default function main(args: any): Promise<void> {
    const adventOfCodeRunner = new AdventOfCodeRunner(args);
    return adventOfCodeRunner.run();
}
