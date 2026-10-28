// Usage: npm run new-script -- my_script
import fs from 'node:fs'
import path from 'node:path'

const name = process.argv[2]
if (!name || !/^[a-zA-Z0-9_-]+$/.test(name)) {
  console.error('Usage: npm run new-script -- script_name   (letters, numbers, _ and - only)')
  process.exit(1)
}
const target = path.join('docs', name)
if (fs.existsSync(target)) {
  console.error(`docs/${name} already exists.`)
  process.exit(1)
}
fs.cpSync('templates/new-script', target, { recursive: true })

function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) walk(p)
    else fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replaceAll('__NAME__', name))
  }
}
walk(target)
console.log(`Created docs/${name}. Edit docs/${name}/script.json and the pages inside it.`)
