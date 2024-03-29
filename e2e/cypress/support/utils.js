export const getTabUrl = (tabName, urlName = '/profile') => `${urlName}?tab=${tabName}`
export const getSubTabUrl = (tabName, urlName = '/profile', subTab) => `${urlName}?tab=${tabName}&subtab=${subTab}`

export const codeOkAndBodyNotNull = response => {
  expect(response).property('status').to.equal(200)
  expect(response.body).to.not.be.oneOf([null, ''])
}

export const codeOkAndBodyEqualsExpected = (response, expectedBody) => {
  codeOkAndBodyNotNull(response)
  expect(response.body).to.deep.equal(expectedBody)
}

export const generateObjects = (count, obj) => new Array(count).fill().map(_ => ({ ...obj }))

export const mergeObjects = el => {
  const newObj = []

  el.forEach(data => newObj.push(...data))
  return newObj
}

export const filterBy = (arr, key, name) => arr.filter(el => el[key] === name)

export const checkElementsInArray = (array, key, value) =>
  array.forEach(el => expect(el[key]).equal(value))

export const removeSpaces = str => str.replace(/\s/g, '')
export const replaceMultipleSpaces = string => string.replace(/\s\s+/g, ' ')
export const checkTwoString = (first, second) =>
  expect(removeSpaces(first)).equal(removeSpaces(second))
