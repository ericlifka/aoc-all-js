import fs from "node:fs"

export const withInput = filename => fs.readFileSync(filename, "utf-8").trim()
export const withInputSegments = (filename, divider) => withInput(filename).split(divider)
export const withInputLines = filename => withInputSegments(filename, '\n')
export const withInputChars = filename => withInputSegments(filename, '')
