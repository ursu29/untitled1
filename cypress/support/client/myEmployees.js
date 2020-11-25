import { employeeData } from './employeeData'

const {
  email,
  id,
  name,
  position,
  __typename,
} = employeeData.employee

export const employeeByEmailData = id => ({
  accessEditGlobal: false,
  id,
  __typename: 'Employee',
})

export const getEmployeeProjects = {
  employees: [],
}

export const employeeProject = id => ({
  id,
  leadingProjects: [],
  projects: [],
  __typename: 'Employee',
})

export const profileData = id => ({
  id,
  subordinateUsers: [],
  __typename: 'Employee',
})

export const subUser = {
  avatar: null,
  email,
  id,
  lastManagerMeeting: null,
  leadingProjects: [],
  projects: [],
  name,
  position,
  __typename,
}
