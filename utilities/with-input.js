import fs from "node:fs"


export const withInputLines = filename =>
    fs.readFileSync(filename, "utf-8").trim().split('\n')

export const withInputChars = filename =>
    fs.readFileSync(filename, "utf-8").trim().split('')
