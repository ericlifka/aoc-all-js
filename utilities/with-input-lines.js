import fs from "node:fs"

export const withInputLines = filename => {
    let input = fs.readFileSync(filename, "utf-8")
    return input.trim().split('\n')
}