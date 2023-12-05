// Put code here
export function runner(input: string) {
    console.log('Problem 1: ', problemOne(parseData(input)));
    console.log('Problem 2: ', problemTwo(parseData(input)));
}

function problemOne(parsedData: DataObject): number {
    const seeds = parsedData.source;
    const mappings = parsedData.mappings;

    let smalledLocation = Number.MAX_SAFE_INTEGER
    for(let i = 0; i < seeds.length; i++) {
        const seed = seeds[i];
        const soil = getMappedValue(mappings.soil, seed);
        const fertilizer = getMappedValue(mappings.fertilizer, soil);
        const water = getMappedValue(mappings.water, fertilizer);
        const light = getMappedValue(mappings.light, water);
        const temperature = getMappedValue(mappings.temperature, light);
        const humidity = getMappedValue(mappings.humidity, temperature);
        const location = getMappedValue(mappings.location, humidity);
        if(smalledLocation > location) {
            smalledLocation = location;
        }
    }
    return smalledLocation
}

function problemTwo(parsedData: DataObject): number {
    const seeds = parsedData.source;
    const mappings = parsedData.mappings;

    let smalledLocation = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < seeds.length; i += 2) {
        // Access the pair of elements
        const rangeStart = seeds[i];
        const rangeLength = seeds[i + 1];

        for(let seed = rangeStart; seed < rangeStart + rangeLength; seed++) {
            const soil = getMappedValue(mappings.soil, seed);
            const fertilizer = getMappedValue(mappings.fertilizer, soil);
            const water = getMappedValue(mappings.water, fertilizer);
            const light = getMappedValue(mappings.light, water);
            const temperature = getMappedValue(mappings.temperature, light);
            const humidity = getMappedValue(mappings.humidity, temperature);
            const location = getMappedValue(mappings.location, humidity);
            if(smalledLocation > location) {
                smalledLocation = location;
            }
        }
    }
    return smalledLocation;
}

function getMappedValue(mapping: Mapping[], source: number): number {
    for(const map of mapping) {
        if(source >= map.sourceRangeStart && source < (map.sourceRangeStart + map.rangeLength)) {
            return map.destinationRangeStart + (source - map.sourceRangeStart);
        }
    }
    return source;
}

type Mapping = {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
};

type DataObject = {
    source: number[];
    mappings: {
        soil: Mapping[];
        fertilizer: Mapping[];
        water: Mapping[];
        light: Mapping[];
        temperature: Mapping[];
        humidity: Mapping[];
        location: Mapping[];
    }
};

function parseData(input): DataObject {
    const lines = input.split('\n').filter(line => line.trim());
    const seeds = lines[0].split(':')[1].trim().split(' ').map(Number);
    const dataObject = {
        source: seeds,
        mappings: {
            soil: [],
            fertilizer: [],
            water: [],
            light: [],
            temperature: [],
            humidity: [],
            location: []
        }
    };

    let currentMappingType = '';

    lines.slice(1).forEach((line: string) => {
        if (line.includes('-to-')) {
            currentMappingType = line.split('-to-')[1].split(' ')[0]; // Extracts the correct mapping
        } else if (currentMappingType && dataObject.mappings[currentMappingType] !== undefined) {
            const mappingValues = line.split(' ').map(Number);
            while (mappingValues.length >= 3) {
                const [destinationRangeStart, sourceRangeStart, rangeLength] = mappingValues.splice(0, 3);
                dataObject.mappings[currentMappingType].push({ destinationRangeStart, sourceRangeStart, rangeLength });
            }
        }
    });

    return dataObject;
}


