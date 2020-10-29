const URL = 'https://portal.dev.sidenis.com/gateway/graphql';

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
  operationName:"GetEmployeeManager",
  variables:{input:{id:id}},
  query: "query GetEmployeeManager($input: EmployeesInput) {employees(input: $input) {id manager {id name position country location phoneNumber email avatar bonuses status isMe}}}"
})

export const getClient = () => ({
  operationName: null,
  variables: {},
  query: "{profile {id strapiId email name position avatar status, bonuses, country,location, phoneNumber}isAuthenticated}"
})

export const getProjects = id => ({
  operationName: "GetEmployeeProjects",
  variables:{input:{id:id}},
  query: "query GetEmployeeProjects($input: EmployeesInput) {employees(input: $input) { id leadingProjects { id name code} projects {id name code}}}"
})

export const getEmployeeExperiences = (id) => ({
  operationName:"getEmployeeExperiences",
  variables:{input:{id:id}},
  query: "query getEmployeeExperiences($input: EmployeesInput) {employees(input: $input) { id name experiences { ...ExperienceDetails comment } access {read write}}}fragment ExperienceDetails on Experience {id level {id index name} skill {id name description isMatrixOnly }updatedAt}"
})

export const getAllSkills = () => ({
  operationName: "getSkills",
  variables:{},
  query: "query getSkills($input: SkillsInput) {skills(input: $input) {id name description parent { id }isMatrixOnly}}"
})

export const getAllMatrices = () => ({
  operationName: null,
  variables:{},
  query: "{matrices {id title description}  matricesAccess {read}}"
})