
export const query = {
  getScrumMasters: '{ projects { ...ProjectDetails scrumMasters { ...EmployeeDetails __typename } employees { id __typename } __typename }} fragment ProjectDetails on Project { id name code description __typename} fragment EmployeeDetails on Employee { id name location country position phoneNumber email isMe startDate birthday __typename}',
  updateHobbyPost: 'mutation updateHobbyPost($input: UpdateHobbyPostInput!) { updateHobbyPost(input: $input) { ...HobbyPostBase __typename }} fragment HobbyPostBase on HobbyPost { id title body createdAt createdBy { id name email __typename } hobbies { id name __typename } language __typename}',
  createHobbyPost: 'mutation createHobbyPost($input: CreateHobbyPostInput!) { createHobbyPost(input: $input) { ...HobbyPostBase __typename }} fragment HobbyPostBase on HobbyPost { id title body createdAt createdBy { id name email __typename } hobbies { id name __typename } language __typename}',
  getHobbyPosts: 'query getHobbyPosts($input: HobbyPostFilterInput) { hobbyPosts(input: $input) { ...HobbyPostBase __typename }} fragment HobbyPostBase on HobbyPost { id title body createdAt createdBy { id name email __typename } hobbies { id name __typename } language __typename}',
  acceptDevRel: 'mutation acceptDevrel($id: ID!) {acceptDevrel(id: $id) {id __typename}}',
  getDevrels: 'query getDevrels($type: String!) { devrels(type: $type) { id type title link resource dateStart dateEnd employee { id email name __typename } isCompleted isDraft skills { id name __typename } __typename }}',
  deleteDevrel: 'mutation deleteDevrel($id: ID!) {deleteDevrel(id: $id) {id __typename}}',
  proposeDevRelEvent: 'mutation proposeDevrelEvent($input: ProposeDevrelEventInput!) {proposeDevrelEvent(input: $input)}',
  getAllBirthdays: 'query {employees { ...EmployeeDetails __typename}}fragment EmployeeDetails on Employee {birthday}',
  getNotifications: 'query getNotifications { notifications {id link title type __typename}}',
  resolveMatrixProposal: 'mutation resolveMatrixProposal($id: ID!) {resolveMatrixProposal(id: $id) {id __typename}}',
  getMatrixProposals: 'query getMatrixProposals($matrix: ID!) { matrixProposals(matrix: $matrix) { id isResolved proposal author { ...EmployeeDetails __typename } cellId group grade skill __typename }} fragment EmployeeDetails on Employee { id name location country position phoneNumber email isMe startDate birthday __typename}',
  deleteMatrixProposal: 'mutation deleteMatrixProposal($id: ID!) {deleteMatrixProposal(id: $id) {id __typename}}',
  getEmployeeMatricesAndGrade: 'query getEmployeeMatrices($input: EmployeesInput) { employees(input: $input) { id name isMe matrices { id title description comment employeeMatrixId access { read write __typename } body { groups { id title description __typename } grades { id title description __typename } skills { type id skill { id name description isMatrixOnly __typename } groupId gradeId __typename } __typename } __typename } __typename }}',
  createMatrixProposal: 'mutation createMatrixProposal($input: CreateMatrixProposalInput!) {createMatrixProposal(input: $input) {id __typename}}',
  deleteHrVacancy: 'mutation deleteHrVacancy($id: ID!) {deleteHrVacancy(id: $id) { id }}',
  createBook: 'mutation createBook($input: CreateBookInput) {createBook(input: $input) {...BookResponse __typename}} fragment BookResponse on Book {id title author tags {id name __typename} holder {id name email __typename} __typename}',
  removeBook: 'mutation removeBook($id: ID!) {removeBook(id: $id) {...BookResponse __typename}}fragment BookResponse on Book {id title author tags {id name __typename}holder {id name email __typename} __typename}',
  deleteWorkplaceBooking: 'mutation deleteWorkplaceBooking($id: ID!) {deleteWorkplaceBooking(id: $id) { id startDate finishDate __typename}}',
  workspacePoolQuery: 'query workspacePoolQuery($input: WorkspacesInput) {workspaces(input: $input) { id name __typename}}',
  workspace: 'query workspace($id: ID!, $bookingsInput: BookingsInput) {workspace(id: $id) {id drawing workplaces {id coordX coordY number bookings(input: $bookingsInput) {id employeeId startDate finishDate __typename} __typename} __typename}}',
  createWorkplaceBooking: 'mutation createWorkplaceBooking($input: CreateWorkplaceBookingInput) {createWorkplaceBooking(input: $input) {id workplace { id  __typename} startDate finishDate __typename}}',
  updateProcessExecution: 'mutation updateProcessExecution($input: UpdateProcessExecutionInput) {updateProcessExecution(input: $input) {id __typename}}',
  publishVacancy: 'mutation publishVacancy($input: PublishVacancyInput) {publishVacancy(input: $input) { id __typename}}',
  completeProcessExecutionStep: 'mutation completeProcessExecutionStep($input: CompleteProcessExecutionStepInput!) {completeProcessExecutionStep(input: $input) {id __typename}}',
  getProcesses: 'query getProcesses($id: ID!) { process(id: $id) { id title customer type steps { ...ProcessStepDetails __typename } __typename }}fragment ProcessStepDetails on ProcessStep { id title description type responsibleUsers { id name email isMe __typename } sendToTeamlead hasComment send24hoursNotification isAgileResponsible parentSteps { id __typename } process { id type __typename } __typename}',
  createProcessStep: 'mutation createProcessStep($input: CreateProcessStepInput) {createProcessStep(input: $input) { id __typename}}',
  updateProcessStep: 'mutation updateProcessStep($input: UpdateProcessStepInput) {updateProcessStep(input: $input) { id  __typename}}',
  getProjectManagers: 'query getProjectManagers($id: ID!) {project(id: $id) {id scrumMasters { ...EmployeeDetails __typename} employees {id agileManager { ...EmployeeDetails __typename} __typename} __typename}}fragment EmployeeDetails on Employee {id name location country position phoneNumber email isMe startDate birthday __typename}',
  createEvent: 'mutation createEvent($input: CreateEventInput!) {createEvent(input: $input) {id __typename}}',
  cancelEvent: 'mutation cancelEvent($input: CancelEventInput!) {cancelEvent(input: $input)}',
  getEvent: 'query getEvent($id: ID!) { event(id: $id) { id title description link start end importance isOnline isExternal city location skills { id name description __typename } attendees { employee { id name email position __typename } status __typename } createdBy { id __typename } __typename }}',
  updateExperience:
    'mutation updateExperience($input: UpdateExperienceInput) { updateExperience(input: $input) {id __typename}}',
  attachMatrixToEmployee:
    'mutation attachMatrixToEmployee($input: AttachMatrixToEmployeeInput) { attachMatrixToEmployee(input: $input) { id __typename}}',
  updateDevelopmentPlan:
    'mutation updateDevelopmentPlan($input: UpdateDevelopmentPlanInput!) {updateDevelopmentPlan(input: $input) { id __typename}}',
  getDevelopmentPlans:
    'query getDevelopmentPlans($input: DevelopmentPlansInput!) { developmentPlans(input: $input) { id createdAt updatedAt developmentRoles { webDeveloper actuarialBusinessAnalyst agileCoach automationQA devOps infrastructureArchitect javaDeveloper dotnetDeveloper manualQA mathematician scrumMaster solutionArchitect teamLead uxExpert productOwner dataAnalyst __typename } guildContribution { internalProject education noContribution startup custom __typename } previousGoals { id description successCriteria isAchieved comment __typename } actualGoals { id description successCriteria isAchieved comment __typename } amountOfTime longTermGoals lookBackNegative lookBackPositive lookForward lastDiscussed __typename }}',
  matricesCustomFieldsMutation:
    'mutation matricesCustomFieldsMutation($input: UpdateMatricesCustomFieldsInput!) {updateMatricesCustomFields(input: $input) {id __typename}}',
  evaluationCustomFields: 'query evaluationCustomFields($input: EvaluationCustomFieldsInput) {evaluationCustomFields(input: $input) {id employeeMail lastDiscussed  __typename}}',
  customFieldsMutationSelfEv: 'mutation customFieldsMutation($input: UpdateCustomFieldsInput!) {updateCustomFields(input: $input) {id  __typename}}',
  matricesCustomFields:
    'query matricesCustomFields($input: MatricesCustomFieldsInput) { matricesCustomFields(input: $input) {id employeeMail lastDiscussed __typename}}',
  getExperiences:
    'query getExperiences($input: ExperiencesInput) { experiences(input: $input) { ...ExperienceDetails __typename }}fragment ExperienceDetails on Experience { id level skill { id name description isMatrixOnly __typename } updatedAt __typename}',
  getProjectSkills: 'query getProjectSkills($id: ID!) { project(id: $id) { id skills { ...SkillDetails __typename } access { read write __typename } __typename }}fragment SkillDetails on Skill { id name description parent { id __typename } isMatrixOnly __typename}',
  updateProjectSkills: 'mutation updateProjectSkills($input: UpdateProjectSkillsInput!) {updateProjectSkills(input: $input) {id __typename}}',
  getProjectByCode: 'query getProjectByCode($code: String!) {projectByCode(code: $code) {...ProjectDetails scrumMasters { id email __typename} __typename}}fragment ProjectDetails on Project {id name code description __typename}',
  getManager:
    'query GetEmployeeManager($input: EmployeesInput) {employees(input: $input) {id manager {id name position country location phoneNumber email bonuses status isMe}}}',
  getClient:
    '{profile {id strapiId email name position status, bonuses, country,location, phoneNumber}isAuthenticated}',
  getProjects:
    'query getEmployeeProjects($id: ID!) {employee(id: $id) {id projects {id name code __typename }employeeProjects { id capacity isExtraCapacity project { id __typename} __typename} __typename}}',
  getEmployeeExperiences:
    'query getEmployeeExperiences($input: EmployeesInput) {employees(input: $input) { id name experiences { ...ExperienceDetails comment } access {read write}}}fragment ExperienceDetails on Experience {id level skill {id name description isMatrixOnly }updatedAt}',
  getEmployee:
    'query getEmployee($email: String!) {employeeByEmail(email: $email) { ...EmployeeDetails agileManager {...EmployeeDetails __typename} bonuses status  __typename}} fragment EmployeeDetails on Employee {id name location country position phoneNumber email isMe __typename}',
  requestOnboardingTicket: 'mutation requestOnboardingTicket($id: ID!) {requestOnboardingTicket(id: $id)}',
  createTraining:
    'mutation createOnboardingTicket($input: CreateOnboardingTicketInput) {createOnboardingTicket(input: $input) {id __typename}}',
  createBookmark:
    'mutation createBookmark($input: CreateBookmarkInput!) {createBookmark(input: $input) {id  __typename}}',
  cancelOnboardingTicket: 'mutation cancelOnboardingTicket($input: CompleteOnboardingTicketInput) {cancelOnboardingTicket(input: $input)}',
  completeTicket:
    'mutation completeOnboardingTicket($input: CompleteOnboardingTicketInput) {completeOnboardingTicket(input: $input)}',
  toggleBookmarklike:
    'mutation toggleBookmarklike($input: ToggleBookmarklikeInput!) {toggleBookmarklike(input: $input) {id __typename}}',
  deleteBookmark:
    'mutation deleteBookmark($input: DeleteBookmarkInput!) {deleteBookmark(input: $input) { id __typename}}',
  deleteSkill: 'mutation deleteSkill($input: DeleteSkillInput!) {deleteSkill(input: $input) { id __typename}}',
  deleteFeedback:
    'mutation deleteFeedback($input: DeleteFeedbackInput!) {deleteFeedback(input: $input) { id __typename}}',
  addFeedback: 'mutation addFeedback($input: FeedbackInput!) {addFeedback(input: $input) {id __typename}}',
  deletePost: 'mutation deletePost($input: DeletePostInput!) {deletePost(input: $input) { id __typename}}',
  createPost: 'mutation createPost($input: CreatePostInput) {createPost(input: $input) {id __typename}}',
  getEmployees: 'query getEmployees($input: EmployeesInput) {employees(input: $input) {name }}',
  getEmployeeTickets: 'query employeeOnboardingTickets {employeeOnboardingTickets {id __typename}}',
  getReviewers: 'query getEvaluationReviewers($input: EvaluationReviewersInput) {evaluationReviewers(input: $input) {toWhom {id name __typename}fromWho {id name isMe __typename} __typename }}',
  deleteReviewer: 'mutation deleteEvaluationReviewer($input: DeleteEvaluationReviewerInput) {deleteEvaluationReviewer(input: $input) {id __typename}}',
  createReviewer: 'mutation createEvaluationReviewer($input: CreateEvaluationReviewerInput) {createEvaluationReviewer(input: $input) {toWhom {id name __typename}fromWho {id name isMe __typename} __typename}}',
  onboardingTickets:
    'query onboardingTickets { onboardingTickets { ...OnboardingTicketDetails __typename } } fragment OnboardingTicketDetails on OnboardingTicket { id title description responsible { id name position email __typename } isOptional isSwissre isRequestedByMe __typename }',
  getOfficeDays:
    'query getOfficeDays($input: OfficeDaysInput) {officeDays(input: $input) { id date employeeLimit location employees {id __typename} __typename}}',
  allSkills:
    'query getSkills($input: SkillsInput) {skills(input: $input) {id name description parent { id }isMatrixOnly}}',
  getAllMatrices: '{matrices {id title description}  matricesAccess {read}}',
  getFirstPost:
    'query getPosts($first:Int,$after:ID,$filter:PostsFilter){ posts(first:$first,after:$after,filter:$filter){ id title body isTranslated createdAt locations createdBy{ id name email __typename } images{ id url fileName __typename } tags{ id name description __typename } __typename } }',
  tags: '{tags {name description, id}}',
  addJob:
    'mutation updateCurriculumVitae($input: UpdateCurriculumVitaeInput!) {updateCurriculumVitae(input: $input) {id __typename}}',
  getCV:
    'query getEmployeeCV($email: String!) {employeeByEmail(email: $email) { id curriculumVitae {id vitaes {id} __typename} __typename}}',
  updateCV:
    'mutation updateCV($input: UpdateCurriculumVitaeInput!) { updateCurriculumVitae(input: $input) { ...CV __typename }}fragment CV on CurriculumVitae { id summary vitaes { id company dateStart dateEnd project position responsibilities level __typename } certificates { id name date expirationDate link __typename } education { id name speciality degree dateStart dateEnd __typename } __typename}',
  updatePost:
    'mutation updatePost($input: UpdatePostInput) {updatePost(input: $input) {id __typename}}',
  deleteTraining:
    'mutation deleteOnboardingTicket($input: DeleteOnboardingTicketInput) {deleteOnboardingTicket(input: $input) { id __typename}}',
  deleteProcess:
    'mutation deleteProcess($id:ID!) {deleteProcess(id: $id) {id}}',
  deleteHrProcess: 'mutation deleteHrProcess($input: DeleteHrProcessInput!) {deleteHrProcess(input: $input) { id __typename}}',
  updateGuild: 'mutation updateGuild($input: UpdateGuildInput) {updateGuild(input: $input) {azureDisplayName __typename}}',
  closeVacancy: 'mutation closeVacancy($input: CloseVacancyInput) {closeVacancy(input: $input) {id __typename}}',
  updateEmp:
    'mutation updateEmployee($input: UpdateEmployeeInput!) {updateEmployee(input: $input) {id __typename}}',
  createNewProcess:
    'mutation createProcess($input: CreateProcessInput!) {createProcess(input: $input) {id __typename}}',
  updateVacancy: 'mutation updateVacancy($input: UpdateVacancyInput) {updateVacancy(input: $input) {id __typename}}',
  createProcess:
    'mutation createProcess($input: CreateProcessInput!) {createProcess(input: $input) {id __typename}}',
  getAllProjects:
    'query getProjects {projects {...ProjectDetails __typename}}fragment ProjectDetails on Project {id name code description __typename}',
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
  getPaths: 'query getPaths($rootPath: String) {wikiPagesPaths(rootPath: $rootPath)}',
  onboardingAccess: 'query onboardingAccess {onboardingAccess {read write __typename}}',
  guild: 'query getGuilds {guilds {title}}',
  guildInfo: 'query getGuild($input: GuildInput) { guild(input: $input) { id azureDisplayName azureId title description shortDescription skills { id name description __typename } leaders { ...EmployeeDetails __typename } accessWrite __typename }}fragment EmployeeDetails on Employee { id name location country position phoneNumber email isMe startDate birthday __typename}',
  getVacanciesId:
    'query getVacancies($input: VacanciesInput) { vacancies(input: $input) { id reason locations position responsibilities requiredSkills additionalSkills description project { id name __typename } customer isPublished isClosed rotateEmployees { id isMe __typename } employeeExperience englishLevel stack __typename }}',
  applyDay:
    'mutation createOfficeBooking($input: CreateOfficeBookingInput!) {createOfficeBooking(input: $input)}',
  getEmployeeMatrices: 'query {clientDevToolsAccess}',
  getAllEmployeeMatrices:
    'query getEmployeeMatrices($input: EmployeesInput) {employees(input: $input) { id  name isMe matrices { id    title description comment  employeeMatrixId access {read write __typename} body {   groups {  id  title   description    __typename     } grades {   id  title  description __typename    }   skills {    type     id   skill {    id   name    description    isMatrixOnly    acceptanceCriteria     sources    additionalSources    __typename   } groupId   gradeId   __typename  }  __typename } __typename  } __typename}}',
  allBookmarkId: 'query getBookmarks($input: BookmarksInput) {bookmarks(input: $input) {id}}',
  cancelRotateRequest: 'mutation cancelRotateRequest($input: CancelRotateRequestInput) {cancelRotateRequest(input: $input) {id __typename}}',
  getVacanci: 'query getVacancies($input: VacanciesInput) { vacancies(input: $input) { id reason locations position responsibilities requiredSkills additionalSkills description project { id name __typename } customer isPublished isClosed rotateEmployees { id isMe __typename } employeeExperience englishLevel stack __typename }}',
  rotateRequest: 'mutation rotateRequest($input: RotateRequestInput) {rotateRequest(input: $input) {id __typename}}',
  getBookmarks:
    'query getBookmarks($input: BookmarksInput) {bookmarks(input: $input) {id title link employee {id name email __typename} skills {id name __typename} likes {id __typename} access {read write __typename}createdAt likedByMe __typename}}',
  archivedDPVersions:
    'query archivedDPVersions($input: ArchiveDPInput) {archivedDPVersions(input: $input) { id createdAt __typename}}',
  sharedFiles:
    'query sharedFiles($input:SharedFilesInput){sharedFiles(input:$input){...SharedFile Fragment __typename}}fragment SharedFile Fragment onSharedFile{id url fileName createdAt createdBy{id name email __typename}size type id skills{id name __typename} __typename}',
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
    'query getSubordinates($email: String!) { employeeByEmail(email: $email) { id subordinateUsers { ...EmployeeDetails lastManagerMeeting one2oneRequest requestedOnboardingTickets { ...OnboardingTicketDetails __typename } projects { ...ProjectDetails __typename } __typename } __typename }}fragment EmployeeDetails on Employee { id name location country position phoneNumber email isMe startDate birthday __typename}fragment ProjectDetails on Project { id name code description __typename}fragment OnboardingTicketDetails on OnboardingTicket { id title description responsible { id name position email __typename } isOptional isSwissre isRequestedByMe __typename}',
  getEvaluationRevieers:
    'query getEvaluationRevieers($input: EvaluationReviewersInput) { evaluationReviewers(input: $input) { id toWhom { id name __typename } fromWho { id name isMe __typename } __typename }}',
  evaluate:
    'mutation evaluate($input: EvaluateInput!) {evaluate(input: $input) { id __typename}}',
  getAllFiles:
    'query sharedFiles($input: SharedFilesInput) { sharedFiles(input: $input) { ...SharedFileFragment __typename }} fragment SharedFileFragment on SharedFile { id url fileName createdAt createdBy { id name email __typename } size type id skills { id name __typename } __typename}',
  updateFileDetails:
    'mutation updateFileDetails($input: UpdateSharedFileInput!) { updateSharedFile(input: $input) { ...FileDetailsFragment __typename }} fragment FileDetailsFragment on SharedFile { id skills { id name __typename } __typename}',
  getEmployeeDetailed:
    'query getEmployeeDetailed($email: String!) {  employeeByEmail(email: $email) {    ...EmployeeDetails    agileManager {      ...EmployeeDetails      __typename    }    bonuses    __typename  }}fragment EmployeeDetails on Employee {  id  name  location  position  phoneNumber  email  isMe  startDate  birthday  __typename}',
  getEmployeesParameters:
    'query getEmployees($input: EmployeesInput, $inputEmail: AccessInput, $inputToWhom: EvaluationReviewersAccessInput) {  employees(input: $input) {    id    name    email    subordinateUsersCount {      users      one2oneRequests      __typename    }    agileManager {      id      name      email      isMe      __typename    }    access {      read      write      __typename    }    isMe    __typename  }  curriculumVitaeAccess(input: $inputEmail) {    read    write    __typename  }  matricesLookReviewersAccess(input: $inputEmail) {    read    write    __typename  }  developmentPlanLookReviewersAccess(input: $inputEmail) {    read    write    __typename  }  evaluationReviewersAccess(input: $inputToWhom) {    read    write    __typename  }}',
  getAllEmployees:
    'query getEmployees {  employees {    ...EmployeeDetails    __typename  }}fragment EmployeeDetails on Employee {  id  name  location  position  phoneNumber  email  isMe  startDate  birthday  __typename}',
}
