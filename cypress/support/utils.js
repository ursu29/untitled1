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
