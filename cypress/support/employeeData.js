export const email = el =>
  el === 'manager' ? 'test.manager@sidenis.com' : 'test.employee@sidenis.com'

export const employeeData = {
  employee: null,
}

export const getEmployeeData = (id, __typename) => ({
  data: {
    employeeByEmail: {
      activeProcessExecutions: [],
      id,
      __typename,
    },
  },
})

export const getAllEmployeeData = __typename => ({
  data: {
    employeeByEmail: {
      ...employeeData.employee,
      __typename,
    },
  },
})

export const getProject = (id, __typename) => ({
  data: {
    employees: [{ id, leadingProjects: [], projects: [], __typename }],
  },
})

export const employeeAccess = { read: true, write: true, __typename: 'Access' }

export const skill = {
  description: 'some text',
  id: 'some id',
  isMatrixOnly: true,
  name: 'some name',
  __typename: 'Skill',
}

export const level = {
  description: 'description',
  id: 'some id',
  index: 0,
  name: 'Wants to know',
  __typename: 'Level',
}
export const experience = {
  comment: 'some test',
  id: 'some id',
  level,
  skill,
  updatedAt: '2020-08-31T05:23:38.249Z',
  __typename: 'Experience',
}
