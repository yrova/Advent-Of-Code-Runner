# Advent of Code Script Runner

## Introduction
My personal script runner for the [Advent of Code](https://adventofcode.com/) challenges. Handles all the boilerplate code for running AOC scripts and obtaining the test data.

## Features
- **Automatic Input (Test data) Retrieval:** If an input file for a specific day is missing, the script automatically downloads it, assuming you've provided a valid session token.
- **Manual Input Placement:** You have the option to manually place the `input.txt` file in the appropriate input folder, organized by year and day.
- **Solution Execution:** Write your solution code in the `runner.ts` file corresponding to the day you are working on.

## Usage

### Command Line Arguments
- `day` : Specify the day to run (range: 1-25).
- `year` : Specify the year to run. Defaults to 2023 if not provided.
- `sessionCookie`: Provide the session token for downloading inputs.

### ENV Variables
 - Alternatively if you don't want to use the command line, you can set the env variables in the env. The env variables will be used if the command are not provided. Command line arguments will take precedence over env variables.
- `DAY`: Specify the day to run (range: 1-25).
- `YEAR`: Specify the year to run. Defaults to 2023 if not provided.
- `SESSION_COOKIE`: Provide the session token for downloading inputs.


### Running the Script
Execute the script using Yarn with the desired arguments. For example:

```bash
yarn start -day 3 -year 2023 -sessionCookie 234jdfj2i3jro3jo13j5
```

## Scripts in `package.json`

Here's a breakdown of the scripts defined in the `package.json` file:

- `start`: Runs the main script using TypeScript Node (`ts-node`). This is the primary script to execute your AOC solutions.
- `build`: Compiles the TypeScript codebase. Useful for checking for compilation errors across the entire project.
- `dev`: Utilizes Nodemon to watch for changes in TypeScript files and automatically restarts the `start` script.
- `lint`: Runs ESLint to identify and report on patterns found in ECMAScript/JavaScript code, helping to ensure code quality.
- `eslint`: Alias for running ESLint.
- `watch`: Continuously watches your TypeScript files and compiles them whenever a change is detected, useful during development.

## Directory Structure
The Advent of Code script runner is organized into year and day-specific directories. Each year has its own folder (e.g., Y2023 for the year 2023), and within each year's folder, there are subfolders for each day (e.g., D01 for Day 1). Each day's folder contains a runner.ts script and an input.txt file. Here's a simplified layout:
```
AOC-Script-Runner/\
├── src/\
│   ├── Y2023/\
│   │   ├── D01/\
│   │   │   ├── runner.ts\
│   │   │   └── input.txt\
│   │   ├── D02/\
│   │   │   ├── runner.ts\
│   │   │   └── input.txt\
│   │   ...\
│   ├── Y2022/\
│   │   ├── D01/\
│   │   │   ├── runner.ts\
│   │   │   └── input.txt\
│   │   ├── D02/\
│   │   │   ├── runner.ts\
│   │   │   └── input.txt\
│   │   ...\
│   ...\
```