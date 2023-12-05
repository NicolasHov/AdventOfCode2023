// parsing
const input = require("fs")
    .readFileSync('./day2.txt', { encoding: "utf-8" })
    .split("\n")
    .map(x => x.substr(x.indexOf(':') + 1))
const inputObj = { 0: 'empty', ...input }
for (const iterator in inputObj) inputObj[iterator] = inputObj[iterator].split(";").map(x => x.split(","))

// solving
const solve = (data) => {
    let listOfGamesToKeep = []
    for (const iterator in data) {
        let counter = 3 // we will decrement counter each time a case is out of scope
        data[iterator].map(games => {
            games
                .map(game => { // scope : max 12 red cubes,max  13 green cubes, and max 14 blue cubes. 
                    game.includes('red') ? game.match(/\d+/)[0] <= 12 ? null : counter-- : null
                    game.includes('green') ? game.match(/\d+/)[0] <= 13 ? null : counter-- : null
                    game.includes('blue') ? game.match(/\d+/)[0] <= 14 ? null : counter-- : null
                })
        })
        counter < 3 ? null : listOfGamesToKeep.push(parseFloat(iterator) + 1)
    }
    return listOfGamesToKeep.reduce((acc, currVal) => acc + currVal, 0,);
}

console.log(solve(inputObj)) // NB: we could have used a regex like this const regex = new RegExp(/(\d+) (red|blue|green)/g)