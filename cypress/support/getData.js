const URL = 'https://portal.dev.sidenis.com/gateway/graphql'

Cypress.Commands.add('post', body => {
  return cy.request({
    url: URL,
    method: 'POST',
    headers: {
      authorization: `Bearer ${Cypress.env('accessToken')}`,
      'content-type': 'application/json',
    },
    body: body,
  })
})

export const getManager = id => ({
  operationName: 'GetEmployeeManager',
  variables: { input: { id: id } },
  query:
    'query GetEmployeeManager($input: EmployeesInput) {employees(input: $input) {id manager {id name position country location phoneNumber email bonuses status isMe}}}',
})

export const getClient = () => ({
  operationName: null,
  variables: {},
  query:
    '{profile {id strapiId email name position status, bonuses, country,location, phoneNumber}isAuthenticated}',
})

export const getProjects = id => ({
  operationName: 'GetEmployeeProjects',
  variables: { input: { id: id } },
  query:
    'query GetEmployeeProjects($input: EmployeesInput) {employees(input: $input) { id leadingProjects { id name code} projects {id name code}}}',
})

export const getEmployeeExperiences = id => ({
  operationName: 'getEmployeeExperiences',
  variables: { input: { id: id } },
  query:
    'query getEmployeeExperiences($input: EmployeesInput) {employees(input: $input) { id name experiences { ...ExperienceDetails comment } access {read write}}}fragment ExperienceDetails on Experience {id level {id index name} skill {id name description isMatrixOnly }updatedAt}',
})

export const getEmployee = email => ({
  operationName: 'getEmployee',
  variables: { email: email },
  query:
    'query getEmployee($email: String!) {employeeByEmail(email: $email) { ...EmployeeDetails agileManager {...EmployeeDetails __typename} bonuses status  __typename}} fragment EmployeeDetails on Employee {id name location country position phoneNumber email isMe __typename}',
})

export const getEmployees = location => ({
  operationName: 'getEmployees',
  variables: { input: { locations: location } },
  query: 'query getEmployees($input: EmployeesInput) {employees(input: $input) {name }}',
})

export const getOfficeDays = (startDate, count = 7) => ({
  operationName: 'getOfficeDays',
  variables: { input: { startDate, count } },
  query: 'query getOfficeDays($input: OfficeDaysInput) { officeDays(input: $input) { date }',
})

export const getAllSkills = () => ({
  operationName: 'getSkills',
  variables: {},
  query:
    'query getSkills($input: SkillsInput) {skills(input: $input) {id name description parent { id }isMatrixOnly}}',
})

export const getAllMatrices = () => ({
  operationName: null,
  variables: {},
  query: '{matrices {id title description}  matricesAccess {read}}',
})

export const getFirstPosts = () => ({
  operationName: 'getPosts',
  variables: { first: 4, filter: { tags: [] } },
  query:
    'query getPosts($first: Int, $after: ID, $filter: PostsFilter) {posts(first: $first, after: $after, filter: $filter) {id title body isTranslated createdAt locations annotation isPublic publishDate titleImage {id url fileName}backgroundImage {id url fileName}foregroundImage {id url fileName}createdBy {id name email}images {id url fileName}tags { id name description}}}',
})

export const getTags = () => ({
  operationName: null,
  variables: {},
  query: '{tags {name description }}',
})

export const setHeaders = (role = 'superUser') => ({
  accept: '*/*',
  authorization: `Bearer ${Cypress.env('accessToken')}`,
  'content-type': 'application/json',
  'dev-only-user-role': role,
  'x-timezone-offset': -180,
})
