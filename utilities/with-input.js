import fs from "node:fs"
import path from "node:path"

let processDay = path.basename(process.argv[1].split('.')[0])
let processYear = path.basename(path.dirname(process.argv[1]))

const filename = () => `input/${processYear}-${processDay}.txt`

export const withInput = () => fs.readFileSync(filename(), "utf-8").trim()
export const withInputSegments = (divider) => withInput().split(divider)
export const withInputLines = () => withInputSegments('\n')
export const withInputChars = () => withInputSegments('')
export const withInputGrid = () => withInputLines().map( line => line.split('') )
