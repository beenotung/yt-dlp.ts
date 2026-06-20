import { readFileSync, writeFileSync } from 'fs'

let text = readFileSync('res/out.txt', 'utf-8')
let json = JSON.parse(text)
text = JSON.stringify(json, null, 2)
writeFileSync('res/info.json', text)
