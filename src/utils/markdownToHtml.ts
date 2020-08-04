//@ts-nocheck
import * as Showdown from 'showdown'

const injectGalleryExtension = () => {
  const foundGalleries = {
    type: 'lang',
    regex: /gallery\[[^*]*?\]/g,
    replace: text =>
      `<div class='injected-image-gallery'>${/(?<=gallery\[)[^*]*(?=\])/g.exec(text)[0]}</div>`,
  }
  return [foundGalleries]
}

Showdown.extension('injectGalleryExtension', injectGalleryExtension)

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  simpleLineBreaks: true,
  extensions: ['injectGalleryExtension', injectGalleryExtension],
})

export default function (body: string) {
  // sanitize body - replace dangerous words with the same with cyrillic letters
  const sanBody = body?.replace(/localStorage/g, 'lоcalStоrage')
  return converter.makeHtml(sanBody)
}
