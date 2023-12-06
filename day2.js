// parsing
const input = require("fs")
    .readFileSync('./day2.txt', { encoding: "utf-8" })
    .split("\n")
    .map(x => x.substr(x.indexOf(':') + 1))
const inputObj = { 0: 'empty', ...input }
for (const iterator in inputObj) inputObj[iterator] = inputObj[iterator].split(";").map(x => x.split(",").map(x => x.trim()))

// solving
const getPossibleGames = (data) => {
    let listOfGamesToKeep = []
    for (const iterator in data) {
        let counter = 3 // we will decrement counter each time a case is out of scope
        data[iterator].map(games => {
            games
                .map(game => { // scope : max 12 red cubes,max  13 green cubes, and max 14 blue cubes. 
                    game.includes('red') ? parseFloat(game.match(/\d+/)[0]) <= 12 ? null : counter-- : null
                    game.includes('green') ? parseFloat(game.match(/\d+/)[0]) <= 13 ? null : counter-- : null
                    game.includes('blue') ? parseFloat(game.match(/\d+/)[0]) <= 14 ? null : counter-- : null
                })
        })
        counter < 3 ? null : listOfGamesToKeep.push(parseFloat(iterator) + 1)
    }
    return listOfGamesToKeep.reduce((acc, currVal) => acc + currVal, 0,);
}

const getFewestCubes = (data) => {
    let listOfFewestNumbers = []
    for (const iterator in data) {
        let maxRed = 0, maxGreen = 0, maxBlue = 0
        data[iterator].map(games => {
            console.log(games);
            games
                .map(game => {
                    let value = parseFloat(game.match(/\d+/)[0])
                    console.log("--value", value);
                    game.includes('red') ? value > maxRed ? maxRed = value : null : null
                    console.log("maxRed", maxRed);
                    // console.log("gamematch:", value);
                    game.includes('green') ? value > maxGreen ? maxGreen = value : null : null
                    console.log("maxGreen", maxGreen);
                    game.includes('blue') ? value > maxBlue ? maxBlue = value : null : null
                    console.log("maxBlue", maxBlue);
                    // console.log("blue:", value);

                })
        })
        // console.log(maxRed);
        // console.log(maxGreen);
        // console.log(maxBlue);
        listOfFewestNumbers.push(maxBlue * maxGreen * maxRed)
        console.log("---------------------------");
    }
    console.log(listOfFewestNumbers);
    return listOfFewestNumbers.reduce((acc, currVal) => acc + currVal, 0,);
}


console.log(getFewestCubes(inputObj))
// console.log(getPossibleGames(inputObj)) // NB: we could have used a regex like this const regex = new RegExp(/(\d+) (red|blue|green)/g)