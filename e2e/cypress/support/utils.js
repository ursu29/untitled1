export const getProfileTabUrl = tabName => `/profile?tab=${tabName}`
export const getCommunityTabUrl = tabName => `/guilds/community-frontend?tab=${tabName}`
export const getHrTabUrl = tabName => `/hr?tab=${tabName}`

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
