export const query = {
  getManager:
    'query GetEmployeeManager($input: EmployeesInput) {employees(input: $input) {id manager {id name position country location phoneNumber email bonuses status isMe}}}',
  getClient:
    '{profile {id strapiId email name position status, bonuses, country,location, phoneNumber}isAuthenticated}',
  getProjects:
    'query getEmployeeProjects($id: ID!) {employee(id: $id) {id projects {id name code __typename} __typename}}',
  getEmployeeExperiences:
    'query getEmployeeExperiences($input: EmployeesInput) {employees(input: $input) { id name experiences { ...ExperienceDetails comment } access {read write}}}fragment ExperienceDetails on Experience {id level skill {id name description isMatrixOnly }updatedAt}',
  getEmployee:
    'query getEmployee($email: String!) {employeeByEmail(email: $email) { ...EmployeeDetails agileManager {...EmployeeDetails __typename} bonuses status  __typename}} fragment EmployeeDetails on Employee {id name location country position phoneNumber email isMe __typename}',
  createTraining:
    'mutation createOnboardingTicket($input: CreateOnboardingTicketInput) {createOnboardingTicket(input: $input) {id __typename}}',
  createBookmark:
    'mutation createBookmark($input: CreateBookmarkInput!) {createBookmark(input: $input) {id  __typename}}',
  completeTicket:
    'mutation completeOnboardingTicket($input: CompleteOnboardingTicketInput) { completeOnboardingTicket(input: $input)}',
  toggleBookmarklike:
    'mutation toggleBookmarklike($input: ToggleBookmarklikeInput!) {toggleBookmarklike(input: $input) {id __typename}}',
  deleteBookmark:
    'mutation deleteBookmark($input: DeleteBookmarkInput!) {deleteBookmark(input: $input) { id __typename}}',
  getEmployees: 'query getEmployees($input: EmployeesInput) {employees(input: $input) {name }}',
  getEmployeeTickets:
      'query employeeOnboardingTickets {employeeOnboardingTickets {id __typename}}',
  onboardingTickets:
    'query onboardingTickets { onboardingTickets { ...OnboardingTicketDetails __typename } } fragment OnboardingTicketDetails on OnboardingTicket { id title description responsible { id name position email __typename } isOptional isSwissRe isRequestedByMe __typename }',
  getOfficeDays:
    'query getOfficeDays($input: OfficeDaysInput) {officeDays(input: $input) { id date employeeLimit employeeCount location employees {id __typename}  __typename}}',
  allSkills:
    'query getSkills($input: SkillsInput) {skills(input: $input) {id name description parent { id }isMatrixOnly}}',
  getAllMatrices: '{matrices {id title description}  matricesAccess {read}}',
  attachMatrixToEmployee: 'mutation attachMatrixToEmployee($input: AttachMatrixToEmployeeInput) { attachMatrixToEmployee(input: $input) { id __typename}}',
  getFirstPost:
    'query getPosts($first:Int,$after:ID,$filter:PostsFilter){ posts(first:$first,after:$after,filter:$filter){ id title body isTranslated createdAt locations createdBy{ id name email __typename } images{ id url fileName __typename } tags{ id name description __typename } __typename } }',
  tags: '{tags {name description }}',
  addJob:
    'mutation updateCurriculumVitae($input: UpdateCurriculumVitaeInput!) {updateCurriculumVitae(input: $input) {id __typename}}',
  getCV:
    'query getEmployeeCV($email: String!) {employeeByEmail(email: $email) { id curriculumVitae {id vitaes {id} __typename} __typename}}',
  updatePost:
    'mutation updatePost($input: UpdatePostInput) {updatePost(input: $input) {id __typename}}',
  deleteTraining:
    'mutation deleteOnboardingTicket($input: DeleteOnboardingTicketInput) {deleteOnboardingTicket(input: $input) { id __typename}}',
  deleteProcess:
    'mutation deleteProcess($id:ID!) {deleteProcess(id: $id) {id}}',
  updateEmp:
    'mutation updateEmployee($input: UpdateEmployeeInput!) {updateEmployee(input: $input) {id __typename}}',
  createNewProcess:
    'mutation createProcess($input: CreateProcessInput!) {createProcess(input: $input) {id __typename}}',
  createProcess:
    'mutation createProcess($input: CreateProcessInput!) {createProcess(input: $input) {id __typename}}',
  createProcessExecution:
    'mutation createProcessExecution($input: CreateProcessExecutionInput) {createProcessExecution(input: $input) {id __typename}}',
  holdProcess:
    'mutation toggleHoldProcessExecution($input: AbortProcessExecutionInput!) {toggleHoldProcessExecution(input: $input) {id __typename}}',
  getProcessExecutions:
    'query getProcessExecutions($input: ProcessExecutionsInput) { processExecutions(input: $input) { id status process { id title type steps { ...ProcessStepDetails __typename } __typename } vacancy { id isPublished rotateEmployees { ...EmployeeDetails __typename } responsibleEmployees { ...EmployeeDetails __typename } editable __typename } executionSteps { id step { id type __typename } description isDone __typename } employee finishDate employeePhone isIndependentStepsActive __typename }}fragment EmployeeDetails on Employee { id name location country position phoneNumber email isMe startDate birthday __typename}fragment ProcessStepDetails on ProcessStep { id title description type responsibleUsers { id name email isMe __typename } sendToTeamlead hasComment send24hoursNotification parentSteps { id __typename } process { id type __typename } __typename}',
  getAllProcess:
    '{processExecutions {id process {id title customer type __typename} status vacancy {id position isPublished __typename} project { id name code __typename} locations employee finishDate activeStepEmployees { id name email __typename} __typename}}',
  updateProcess:
    'mutation updateProcessExecution($input: UpdateProcessExecutionInput) {updateProcessExecution(input: $input) {id __typename}}',
  getWikiRootSections:
    'query getWikiRootSections {wikiRootSections {id title description icon path __typename}}',
  onboardingAccess: 'query onboardingAccess {onboardingAccess {read write __typename}}',
  guild: 'query getGuilds {guilds {title}}',
  getVacanciesId:
    'query getVacancies($input: VacanciesInput) { vacancies(input: $input) { id reason locations position responsibilities requiredSkills additionalSkills project { id name __typename } customer isPublished isClosed rotateEmployees { id isMe __typename } employeeComment comment employeeExperience englishLevel stack __typename }}',
  applyDay:
    'mutation apply($input: ApplyToWorkFromOfficeInput!) {applyToWorkFromOffice(input: $input)}',
  getEmployeeMatrices: 'query {clientDevToolsAccess}',
  updateExperience: 'mutation updateExperience($input: UpdateExperienceInput) { updateExperience(input: $input) {id __typename}}',
  getAllEmployeeMatrices:
    'query getEmployeeMatrices($input: EmployeesInput) { employees(input: $input) { id name isMe matrices { id title description comment employeeMatrixId access { read write __typename } body { groups { id title description __typename } grades { id title description __typename } skills { type skill { id name description isMatrixOnly __typename } groupId gradeId __typename } __typename } __typename } __typename }}',
  allBookmarkId: 'query getBookmarks($input: BookmarksInput) {bookmarks(input: $input) {id}}',
  getBookmarks:
    'query getBookmarks($input: BookmarksInput) {bookmarks(input: $input) {id title link employee {id name email __typename} skills {id name __typename} likes {id __typename} access {read write __typename}createdAt likedByMe __typename}}',
  archivedDPVersions:
    'query archivedDPVersions($input: ArchiveDPInput) {archivedDPVersions(input: $input) { id createdAt __typename}}',
  sharedFiles:
    'query sharedFiles($input:SharedFilesInput){ sharedFiles(input:$input){ hasMore files{ id url fileName createdAt createdBy{ id name email __typename } size type details{ id skills{ id name __typename } __typename } __typename } __typename } }',
  getGuild:
    'query getGuild($input: GuildInput) { guild(input: $input) {id azureDisplayName azureId title description shortDescription skills {id name description __typename}leaders { ...EmployeeDetails __typename}accessWrite __typename}}fragment EmployeeDetails on Employee {  id  name  location  country  position  phoneNumber  email  isMe  startDate  birthday  __typename}',
  getStream:
    'query getStream($input: StreamsInput, $inputCount: TotalStreamsCountInput) {streams(input: $input) {id videoId name description duration privacyMode likes views comments publishedDate creatorName creatorMail skills {id name description __typename}__typename}totalStreamsCount(input: $inputCount)}',
  getEmployeeCV:
    'query getEmployeeCV($email: String!) { employeeByEmail(email: $email) { id curriculumVitae { id vitaes { id company dateStart dateEnd project position responsibilities level __typename } __typename } __typename }}',
  getEmployeeName: 'query getEmployeeName($id:ID!){employee(id:$id){id name email __typename}}',
  getEvaluations:
    'query getEvaluations($evaluationsInput: EvaluationsInput!, $evaluationCommentsInput: EvaluationCommentsInput!) { evaluations(input: $evaluationsInput) { id updatedAt fromWho { id name __typename } toWhom { id name __typename } comment evaluation evaluationAttribute { id __typename } __typename } evaluationComments(input: $evaluationCommentsInput) { id body evaluationAttribute { id __typename } editable __typename }}',
  getSubordinates:
    'query getSubordinates($email: String!) { employeeByEmail(email: $email) { id subordinateUsers { ...EmployeeDetails lastManagerMeeting one2oneRequest requestedOnboardingTickets { ...OnboardingTicketDetails __typename } projects { ...ProjectDetails __typename } __typename } __typename }}fragment EmployeeDetails on Employee { id name location country position phoneNumber email isMe startDate birthday __typename}fragment ProjectDetails on Project { id name code description __typename}fragment OnboardingTicketDetails on OnboardingTicket { id title description responsible { id name position email __typename } isOptional isSwissRe isRequestedByMe __typename}',
  getEvaluationRevieers:
    'query getEvaluationRevieers($input: EvaluationReviewersInput) { evaluationReviewers(input: $input) { id toWhom { id name __typename } fromWho { id name isMe __typename } __typename }}',
}
