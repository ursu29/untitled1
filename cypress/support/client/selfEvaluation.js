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

export const fromWhoReviewers = {
  ...fromWhoData,
  isMe: false,
}

export const toWhomData = id => ({
  id,
  name: 'Test Employee',
  __typename: 'Employee',
})

export const evaluationAttributesData = {
  description: null,
  group: 'quality_of_work',
  id: 'some id',
  index: 2,
  title: 'Test',
  __typename: 'EvaluationAttribute',
}

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

export const archivedSEFVersion = {
  createdAt: 'date',
  id: 'some id',
  __typename: 'ArchivedSEFVersion',
}

export const evaluationReviewersData = {
  fromWho: {},
  id: 'some id',
  toWhom: {},
  __typename: 'EvaluationReviewer',
}
