// Static pre-rendering: render <App /> to HTML at build time and inject it into
// the client index.html, so crawlers and link-preview bots receive full content.
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const abs = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(abs('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const appHtml = render()
const html = template.replace('<!--app-html-->', appHtml)

fs.writeFileSync(abs('dist/index.html'), html)
fs.rmSync(abs('dist/server'), { recursive: true, force: true })

console.log('✓ pre-rendered dist/index.html (' + appHtml.length + ' chars of static markup)')
