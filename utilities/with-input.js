import fs from "node:fs"

const filename = (year, day) => `input/${year}-${day}.txt`

export const withInput = (year, day) => fs.readFileSync(filename(year, day), "utf-8").trim()
export const withInputSegments = (year, day, divider) => withInput(year, day).split(divider)
export const withInputLines = (year, day) => withInputSegments(year, day, '\n')
export const withInputChars = (year, day) => withInputSegments(year, day, '')
