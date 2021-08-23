import { LANGUAGE_LEVELS, LANGUAGES } from '../../constants'

const specSymbol = '@@@'

export type LangObject = Record<keyof typeof LANGUAGES, keyof typeof LANGUAGE_LEVELS>

const parseString = (string: string): [string, LangObject] => {
  const [optional, jsonString] = string.split(specSymbol)
  let json = {} as LangObject

  try {
    json = JSON.parse(jsonString)
  } catch (e) {
    console.warn(`Error trying to parse languages string: ${e}`)
  }

  return [optional, json]
}

const stringifyLangData = (languages: string, obj: LangObject): string => {
  return `${languages}${specSymbol}${JSON.stringify(obj)}`
}

const employeeCVLanguagesParser = (
  languages: string | undefined | null,
): [string, LangObject, typeof stringifyLangData] => {
  if (!languages) {
    return ['', {} as LangObject, stringifyLangData]
  }

  return [...parseString(languages), stringifyLangData]
}

export default employeeCVLanguagesParser
