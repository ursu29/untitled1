import * as Showdown from 'showdown'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  simpleLineBreaks: true,
})

export default function (body: string) {
  // sanitize body - replace dangerous words with the same with cyrillic letters
  const sanBody = body?.replace(/localStorage/g, 'lоcalStоrage')
  return converter.makeHtml(sanBody)
}
