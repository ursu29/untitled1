export const LINK_REGEXP = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

export const LINK_REGEXP_EXTERNAL = /^(https?:\/\/|\/\/)/i

export const makeExternalUrl = (url: string) => {
  const isAbsolute = LINK_REGEXP_EXTERNAL.test(url.trim())
  return isAbsolute ? url : `//${url}`
}
