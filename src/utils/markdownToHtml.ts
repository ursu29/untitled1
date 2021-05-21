//@ts-nocheck
import * as Showdown from 'showdown'

const injectExtensions = () => {
  const foundGalleries = {
    type: 'lang',
    regex: /GALLERY\([^*]*?\)GALLERY/g,
    replace: text => {
      const formattedString = text.slice(8, text.length - 8)
      return `<div class='md-injected-gallery'>${formattedString}</div>`
    },
  }
  const foundGalleriesOLD = {
    type: 'lang',
    regex: /gallery\([^*]*?\)/g, //TODO: deprecated
    replace: text => {
      const formattedString = text.slice(8, text.length - 1)
      return `<div class='injected-image-gallery'>${formattedString}</div>`
    },
  }
  const foundCollapses = {
    type: 'lang',
    regex: /COLLAPSE({.*})?\((\s*TITLE([^]*?)TITLE\s*BODY([^]*?)BODY\s*)+\)COLLAPSE/g,
    replace: text => {
      const innerString = /(COLLAPSE({.*?})?\(\s*)[^]*?(\s*\)COLLAPSE)/g.exec(text)?.[0]

      const isGhost = text.search(/(COLLAPSE{)ghost(})/g) !== -1

      const titlesRegexp = /(TITLE\(\s*)[^]+?(\s*\)TITLE)/gm
      const bodiesRegexp = /(BODY\(\s*)[^]+?(\s*\)BODY)/gm

      let resTitlesList, resBodiesList

      const titles = []
      const bodies = []

      while ((resTitlesList = titlesRegexp.exec(innerString)) !== null) {
        titles.push(trimMeta(resTitlesList?.[0], 'TITLE') || '')
      }
      while ((resBodiesList = bodiesRegexp.exec(innerString)) !== null) {
        bodies.push(trimMeta(resBodiesList?.[0], 'BODY') || '')
      }

      const resObj = { titles: titles.map(e => e.trim()), bodies: bodies.map(e => e.trim()) }

      return `<div class='md-injected-collapse' data-ghost='${isGhost}'>${JSON.stringify(
        resObj,
      )}</div>`
    },
  }
  const foundBlocks = {
    type: 'lang',
    regex: /BLOCK({.*})?\([^]*?\)BLOCK/g,
    replace: text => {
      const color = /(BLOCK{).*?(})/g.exec(text)?.[0]?.replace(/(^BLOCK{)|(}$)/g, '')
      const body = /(BLOCK({.*})?\(\s*)[^]*?(\s*\)BLOCK)/g.exec(text)?.[0]
      return `<div class='md-injected-block' data-color='${color}'>${trimMeta(body, 'BLOCK')}</div>`
    },
  }
  const foundSpaces = {
    type: 'lang',
    regex: /SPACE\([.\d]*\)SPACE/g,
    replace: text => {
      const space = /(SPACE\()[.\d]*(\)SPACE)/.exec(text)?.[0]
      return `<div class='md-injected-space'>${trimMeta(space, 'SPACE')}</div>`
    },
  }
  const foundTables = {
    type: 'lang',
    regex: /TABLE\((\s*ROW([^]*?)ROW\s)+\)TABLE/g,
    replace: text => {
      const innerString = /(TABLE\(\s*)[^]*?(\s*\)TABLE)/g.exec(text)?.[0]
      const rowsRegexp = /(ROW\(\s*)[^]+?(\s*\)ROW)/gm

      let resRowsList

      const rows = []

      while ((resRowsList = rowsRegexp.exec(innerString)) !== null) {
        rows.push((trimMeta(resRowsList?.[0], 'ROW') || '').split('#COL#').map(e => e.trim()))
      }

      return `<div class='md-injected-table'>${JSON.stringify(rows)}</div>`
    },
  }
  return [foundGalleries, foundCollapses, foundBlocks, foundSpaces, foundTables, foundGalleriesOLD]
}

Showdown.extension('injectExtensions', injectExtensions)

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  simpleLineBreaks: true,
  extensions: ['injectExtensions'],
})

export default function markdownToHtml(body: string) {
  // sanitize body - replace dangerous words with the same with cyrillic letters
  const sanBody = body?.replace(/localStorage/g, 'lоcalStоrage')
  return converter.makeHtml(sanBody)
}

/**
 * UTILS
 */

function trimMeta(text: string, meta: string) {
  const regexp = new RegExp(`(${meta}({.*})?\\()|(\\)${meta})`, 'g')
  return text.replace(regexp, '').trim()
}
