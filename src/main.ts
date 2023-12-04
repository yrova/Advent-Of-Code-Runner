import yargs from "yargs";
import { verifyImportForDay } from "./utils/verifyInputData";
import { executeScript } from "./utils/executeScripts";
import { env } from "./utils/environment";

export class AdventOfCodeRunner {
    private readonly day: number;
    private readonly year: number;
    private readonly sessionCookie: string;

    public constructor(args: any) {
        this.day = args.day || env.DAY;
        this.year = args.year || env.YEAR;
        this.sessionCookie = args.sessionCookie || env.SESSION_COOKIE;

        console.table({
            day: this.day,
            year: this.year,
            sessionCookie: this.sessionCookie,
        });
    }

    async run() {
        console.log(`Running script for Year: ${this.year}, Day: ${this.day}...`);
        await verifyImportForDay(
            this.year.toString(),
            this.day.toString(),
            this.sessionCookie
        );
        await executeScript(this.year.toString(), this.day.toString());
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
        throw new Error(`You are dumb.`);
    });
}

export default function main(args: any): Promise<void> {
    const adventOfCodeRunner = new AdventOfCodeRunner(args);
    return adventOfCodeRunner.run();
}
