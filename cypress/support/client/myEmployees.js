import { employeeData } from './employeeData'

const {
  country,
  email,
  id,
  isMe,
  location,
  name,
  phoneNumber,
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
  country,
  email,
  id,
  isMe,
  lastManagerMeeting: null,
  leadingProjects: [],
  projects: [],
  location,
  name,
  phoneNumber,
  position,
  __typename,
}
