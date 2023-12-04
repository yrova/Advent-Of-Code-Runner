// Put code here
export function runner(input: string) {
    const p1 = problemOne(input);
    const p2 = problemTwo(input);
    console.log('Problem 1: ', p1);
    console.log('Problem 2: ', p2);
}

function problemOne(input: string): number {
    const parsedData = parseInput(input);
    let totalScore = 0;
    for (const data of parsedData) {
        const directions = new Set<string>(data.winningNumbers);
        let score = 0;
        for(const num of data.pickedNumbers) {
            if(directions.has(num)) {
                if(score === 0) {
                    score = 1;
                } else {
                    score *= 2;
                }
            }
        }
        totalScore += score;
    }
    return totalScore;
}

function problemTwo(input: string): number {
    const parsedData = parseInput(input);
    for (const data of parsedData) {
        const directions = new Set<string>(data.winningNumbers);
        let matches = 0;
        for(const num of data.pickedNumbers) {
            if(directions.has(num)) {
                matches++;
            }

            data.matches = matches;
        }
    }

    for (let i = parsedData.length - 1; i >= 0; i--) {
        let copies = 1;
        const matches = parsedData[i].matches;
        if(matches > 0) {
            for(let j = matches + i; j > i; j--) {
                if (j < parsedData.length) {
                    copies += parsedData[j].copies;
                }
            }
        }

        parsedData[i].copies = copies;
    }

    const sum: number = parsedData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.copies;
    }, 0);

    return sum;
}

function parseInput(input: string): any[] {
    const lines = input.split('\n');
    const parsedData = lines.map(line => {

        const [cardPart, numberPart] = line.split(':');
        const cardNumberMatch = cardPart.match(/\d+/);
        if (!cardNumberMatch) return null; // Skip if no card number found

        const cardNumber = parseInt(cardNumberMatch[0]);

        const numberParts = numberPart.split('|').map(part =>
            part.trim().split(/\s+/).map(Number)
        )

        return {
            cardNumber,
            winningNumbers: numberParts[0],
            pickedNumbers: numberParts[1]
        };
    });

    return parsedData.filter(data => data);
}