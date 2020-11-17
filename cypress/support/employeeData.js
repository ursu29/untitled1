export const employeeData = {
  agileManager: null,
  avatar: null,
  bonuses: 0,
  country: 'Russia',
  email: 'test.employee@sidenis.com',
  id: '1bf931df-2015-4516-ac33-0d2caddc7df2',
  isMe: true,
  location: 'Saint-Petersburg',
  name: 'Test Employee',
  phoneNumber: '+7(905)209-83-92',
  position: 'Automation QA',
  status: 'Unavailable',
  __typename: 'Employee',
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
      ...employeeData,
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
