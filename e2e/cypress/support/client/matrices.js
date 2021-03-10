export const matrixEmployees = (id, name, __typename) => ({
  id,
  isMe: true,
  matrices: [],
  name,
  __typename,
})

export const matrixEl = {
  link: '.sc-dxgOiQ',
  name: '.sc-brqgnP',
  info: '.sc-jAaTju',
}

export const matrix = {
  access: { read: false, write: false, __typename: 'Access' },
  body: {},
  comment: null,
  description: null,
  employeeMatrixId: 'some id',
  id: 'some id',
  title: 'QA Matrix',
  __typename: 'Matrix',
}

export const grade = { id: 'some id', title: 'title', description: null, __typename: 'MatrixGrade' }
export const group = {
  id: '1',
  title: 'Manual Testing',
  description: null,
  __typename: 'MatrixGroup',
}

export const matrixBody = {
  grades: [],
  groups: [],
  skills: [],
  __typename: 'MatrixBody',
}

export const skillData = {
  id: 'some id',
  name: 'Unnamed',
  description: null,
  isMatrixOnly: false,
  __typename: 'Skill',
}
export const skills = {
  gradeId: '3',
  groupId: '1',
  skill: skillData,
  type: 'space_boilerplate',
  __typename: 'MatrixSkill',
}
