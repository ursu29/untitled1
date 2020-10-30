export const firstWord = (text: string) => text.split(' ')[0]
export const getDataAttr = (data: any) =>
  Array.isArray(data) ? firstWord(data[0]) : firstWord(data)
export const getFirstWord = (data: any) =>
  typeof data === 'object' ? getDataAttr(data.props.children) : firstWord(data)
