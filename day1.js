// import { data } from "./data.js";

// parsing
const input = require("fs")
    .readFileSync('./day1.txt', { encoding: "utf-8" })
    .split("\n")

const dicoNumbers = { "zero": 0, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "two": 2, "three": 3, "one": 1 }

const solve = input => {
    return filteredData = input
        .map((str) => {
            // numbersRegx.test(str) ? // TODO: check if string DO contain numbers words
            for (const iterator of Object.keys(dicoNumbers)) {
                // TODO: find a more subtle way to do this, instead of awful tricks to avoid cases like 'oneight' who become "on8" instead of "18"
                str = str.replaceAll("oneight", "18")
                str = str.replaceAll("eightwo", "82")
                str = str.replaceAll("eighthree", "83")
                str = str.replaceAll("nineight", "98")
                str = str.replaceAll("twone", "21")
                str = str.replaceAll("fiveight", "58")
                str = str.replaceAll("threeight", "38")
                // replace word by number:
                str = str.replaceAll(iterator, dicoNumbers[iterator])
            }
            return str
            // : null
        })
        .map(str => /\d/.test(str) ? // check if string contain numbers
            str.split('')
                .filter(char => !isNaN(parseFloat(char)) && isFinite(char))
            : null)
        .map(tab =>
            parseFloat([tab[0], tab[tab.length - 1]].join(''))
        )
        .reduce((partialSum, a) => partialSum + a, 0);
}

console.log(solve(input));