import fs from "node:fs"

export const withInput = filename => fs.readFileSync(filename, "utf-8").trim()
export const withInputLines = filename => withInput(filename).split('\n')
export const withInputChars = filename => withInput(filename).split('')
