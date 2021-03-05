export const employeeByEmailData = id => ({
  accessEditGlobal: false,
  id,
  __typename: 'Employee',
})

export const getEmployeeProjects = {
  employees: [],
}

export const profileData = id => ({
  id,
  subordinateUsers: [],
  __typename: 'Employee',
})
