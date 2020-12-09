export const query = {
  getManager:
    'query GetEmployeeManager($input: EmployeesInput) {employees(input: $input) {id manager {id name position country location phoneNumber email bonuses status isMe}}}',
  getClient:
    '{profile {id strapiId email name position status, bonuses, country,location, phoneNumber}isAuthenticated}',
  getProjects:
    'query GetEmployeeProjects($input: EmployeesInput) {employees(input: $input) { id leadingProjects { id name code} projects {id name code}}}',
  getEmployeeExperiences:
    'query getEmployeeExperiences($input: EmployeesInput) {employees(input: $input) { id name experiences { ...ExperienceDetails comment } access {read write}}}fragment ExperienceDetails on Experience {id level {id index name} skill {id name description isMatrixOnly }updatedAt}',
  getEmployee:
    'query getEmployee($email: String!) {employeeByEmail(email: $email) { ...EmployeeDetails agileManager {...EmployeeDetails __typename} bonuses status  __typename}} fragment EmployeeDetails on Employee {id name location country position phoneNumber email isMe __typename}',
  createTraining:
    'mutation createOnboardingTicket($input: CreateOnboardingTicketInput) {createOnboardingTicket(input: $input) {id __typename}}',
  createBookmark:
    'mutation createBookmark($input: CreateBookmarkInput!) {createBookmark(input: $input) {id __typename}}',
  completeTicket:
    'mutation completeOnboardingTicket($input: CompleteOnboardingTicketInput) { completeOnboardingTicket(input: $input)}',
  toggleBookmarklike:
    'mutation toggleBookmarklike($input: ToggleBookmarklikeInput!) {toggleBookmarklike(input: $input) {id __typename}}',
  deleteBookmark:
    'mutation deleteBookmark($input: DeleteBookmarkInput!) {deleteBookmark(input: $input) {id __typename}}',
  getEmployees: 'query getEmployees($input: EmployeesInput) {employees(input: $input) {name }}',
  getEmployeeTickets: 'query employeeOnboardingTickets { employeeOnboardingTickets}',
  getOfficeDays:
    'query getOfficeDays($input: OfficeDaysInput) { officeDays(input: $input) { date }',
  allSkills:
    'query getSkills($input: SkillsInput) {skills(input: $input) {id name description parent { id }isMatrixOnly}}',
  getAllMatrices: '{matrices {id title description}  matricesAccess {read}}',
  getFirstPost:
    'query getPosts($first: Int, $after: ID, $filter: PostsFilter) {posts(first: $first, after: $after, filter: $filter) {id title body isTranslated createdAt locations annotation isPublic publishDate titleImage {id url fileName}backgroundImage {id url fileName}foregroundImage {id url fileName}createdBy {id name email}images {id url fileName}tags { id name description}}}',
  tags: '{tags {name description }}',
  updatePost:
    'mutation updatePost($input: UpdatePostInput) {updatePost(input: $input) {id __typename}}',
  deleteTraining:
    'mutation deleteOnboardingTicket($input: DeleteOnboardingTicketInput) {deleteOnboardingTicket(input: $input) { id __typename}}',
}
