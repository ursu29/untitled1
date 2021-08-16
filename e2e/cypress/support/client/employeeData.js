export const email = el =>
  el === 'manager' ? 'test.manager@syncretis.com' : 'test.employee@syncretis.com'

const defaultReadAccess = (bool = false) => ({ read: bool, __typename: 'Access' })
const defaultWriteAccess = (bool = false) => ({ write: bool, __typename: 'Access' })

export let agileManagerData = idManager => ({
  country: null,
  email: "test.manager@syncretis.com",
  id: idManager,
  isMe: false,
  location: "SAINT_PETERSBURG",
  name: "Test Manager",
  phoneNumber: "+7 (905) 209-83-92",
  position: "Agile Manager",
  __typename: "Employee"
})

export let employeesData = (idClient, idManager) => ({
  employee: {
    agileManager: agileManagerData(idManager),
    bonuses: null,
    country: null,
    email: "test.employee@syncretis.com",
    id: idClient,
    isMe: true,
    location: "SAINT_PETERSBURG",
    name: "Test Employee",
    phoneNumber: "+7 (905) 209-83-92",
    position: "Automation QA // Senior teapot",
    status: "Available",
    __typename: "Employee"
  },
})

export let agileManager = {
  country: null,
  email: 'test.manager@syncretis.com',
  id: '6030dc16f84074001c0789aa',
  isMe: false,
  location: 'SAINT_PETERSBURG',
  name: 'Test Manager',
  phoneNumber: '+7(905)209-83-92',
  position: 'Agile Manager',
  __typename: 'Employee',
}

export let employeeData = {
  employee: {
    agileManager,
    bonuses: 35000, // should be 0
    country: null,
    email: 'test.employee@syncretis.com',
    id: '6030dc16f84074001c0789a9',
    isMe: true,
    location: 'SAINT_PETERSBURG',
    name: 'Test Employee',
    phoneNumber: '+7(905)209-83-92',
    position: 'Automation QA',
    status: 'Available',
    __typename: 'Employee',
  },
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

export const matricesAccess = {
  data: {
    matricesAccess: defaultReadAccess(false),
    onboardingAccess: defaultReadAccess(false),
    processExecutionsAccess: defaultReadAccess(false),
    processesAccess: defaultWriteAccess(false),
  },
}

export const oneTwoOne = {
  button: 'oneTwoOne',
  disableBtn: '.ant-popover-disabled-compatible-wrapper',
  text: 'Are you sure you want to create request?',
  closeTitle: 'Are you sure you want to close request?',
}

export const popUp = {
  title: '.ant-popover-message-title',
  button: '.ant-btn-sm',
}

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
