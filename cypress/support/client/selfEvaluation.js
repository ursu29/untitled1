export const evaluationsData = {
  evaluationComments: [],
  evaluations: [],
}

export const evaluationAttributeData = {
  id: 'some id',
  __typename: 'EvaluationAttribute',
}

export const fromWhoData = {
  id: 'some id',
  name: 'name',
  __typename: 'Employee',
}

export const toWhomData = id => ({
  id,
  name: 'Test Employee',
  __typename: 'Employee',
})

export const evaluation = {
  comment: '',
  evaluation: 0,
  evaluationAttribute: evaluationAttributeData,
  fromWho: fromWhoData,
  id: 'some is',
  toWhom: {},
  updatedAt: '2020-08-25T07:49:08.859Z',
  __typename: 'Evaluation',
}
