import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// CHANGE THIS to your own GitHub repository for the docs.
const REPO = 'https://github.com/NyxenScript/NyxenScript.github.io'

const docsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

type Item = { text: string; link: string }
type Group = { text: string; items: Item[] }
type Script = { dir: string; title: string; tagline: string; first: string; groups: Group[] }

// Every folder in docs/ that contains a script.json is treated as one script.
// To add a script: run `npm run new-script -- my_script` (see TUTORIAL.md).
function loadScripts(): Script[] {
  return fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_') && d.name !== 'public')
    .filter((d) => fs.existsSync(path.join(docsDir, d.name, 'script.json')))
    .map((d) => {
      const meta = JSON.parse(fs.readFileSync(path.join(docsDir, d.name, 'script.json'), 'utf8'))
      const groups: Group[] = (meta.sidebar ?? []).map((g: any) => ({
        text: g.text,
        items: g.items.map((i: any) => ({ text: i.text, link: `/${d.name}${i.link}` })),
      }))
      return {
        dir: d.name,
        title: meta.title ?? d.name,
        tagline: meta.tagline ?? '',
        first: groups[0]?.items[0]?.link ?? `/${d.name}/`,
        groups,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

const scripts = loadScripts()

export default defineConfig({
  title: 'Nyx Docs',
  description: 'Documentation for my FiveM scripts.',
  // On GitHub Pages the site lives at /<repo-name>/. The deploy workflow sets DOCS_BASE for you.
  base: process.env.DOCS_BASE || '/',
  lastUpdated: true,
  cleanUrls: true,
  transformPageData(pageData) {
    // Fill the home page cards automatically from the scripts list.
    if (pageData.relativePath === 'index.md') {
      pageData.frontmatter.features = scripts.map((s) => ({
        title: s.title,
        details: s.tagline,
        link: s.first,
        linkText: 'Open docs',
      }))
    }
  },
  themeConfig: {
    nav: [
      {
        text: 'Scripts',
        items: scripts.map((s) => ({ text: s.title, link: s.first })),
      },
    ],
    sidebar: Object.fromEntries(scripts.map((s) => [`/${s.dir}/`, s.groups])),
    socialLinks: [{ icon: 'github', link: REPO }],
    search: { provider: 'local' },
    editLink: {
      pattern: `${REPO}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    footer: { message: 'Documentation for my FiveM scripts' },
  },
})
