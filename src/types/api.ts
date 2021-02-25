export interface Skill {
  id: string
  name: string
  description: string
  parent: Skill | null
  isMatrixOnly: boolean
}

export interface Employee {
  id: string
  name: string
  firstName: string
  lastName: string
  position: string
  country: string
  location: LOCATION
  phoneNumber: string
  email: string
  isMe: boolean
  startDate: string | null
  birthday: string | null
  subordinateUsers: Employee
  subordinateUsersCount: {
    users: number
    one2oneRequests: number
  }
  bonuses: number | null
  status: string
  access: Access
  experiences: Experience[]
  matrices: Matrix[]
  worksFromOffice: string[]
  lastManagerMeeting: string
  one2oneRequest: boolean
  projects: Project[]
  requestedOnboardingTickets: OnboardingTicket[]
}

export interface CurriculumVitae {
  id: string
  company: string
  dateStart: string
  dateEnd: string
  project: string
  position: string
  responsibilities: string
  level: string
}

export interface Tag {
  id: string
}

export interface Post {
  id: string
  title: string
  body: string
  isTranslated: boolean
  createdAt: string
  locations: string[]
  createdBy: Employee
  updatedBy: Employee
  images: File[]
  tags: Tag[]
}

export interface Project {
  id: string
  name: string
  code: string
  description: string
  leaders: Employee[]
  employees: Employee[]
  access: Access
  scrumMasters: Employee[] | null
}

export interface File {
  id: string
  url: string
  fileName: string
  createdAt: string
  createdBy: Employee | null
  updatedBy: Employee | null
  updatedAt: string
  size: number
  type: 'presentation' | 'video' | 'image'
  details: FileDetails | null
}

export interface FileDetails {
  id: string
  skills: Skill[]
}

export interface Bookmark {
  id: string
  title: string
  link: string
  employee: Employee
  skills: Skill[]
  likes: Bookmarklike[]
  access: Access
  createdAt: string
  likedByMe: boolean
}

export interface Bookmarklike {
  id: string
  employee: Employee
  bookmark: Bookmark
}

export interface Access {
  read: boolean
  write: boolean
}

export interface MatrixSkill {
  id: string
  type: string
  skill: Skill | { id: string }
  gradeId: string
  groupId: string
}
export interface MatrixGroup {
  id: string
  title: string
  description?: string
}

export interface MatrixGrade {
  id: string
  title: string
  description?: string
}

export interface Matrix {
  id: string
  title: string
  description: string
  body: {
    grades: MatrixGrade[]
    groups: MatrixGroup[]
    skills: MatrixSkill[]
  }
  access: Access
  comment?: string
  employeeMatrixId?: string
}

export interface Experience {
  id: string
  skill: Skill
  employee: Employee
  level: LEVEL
  updatedAt: string
  comment: string
}

export enum LEVEL {
  WANTED = 'WANTED',
  LEARNING = 'LEARNING',
  EXPERIENCED = 'EXPERIENCED',
  CONFIDENT = 'CONFIDENT',
}

export interface Tag {
  id: string
  name: string
  description: string
  posts: Post[]
}
export interface DevelopmentGoal {
  id: string
  description: string
  successCriteria: string
  isAchieved: boolean
  comment: string
  createdAt: string
  updatedAt: string
}

export interface DevelopmentPlan {
  id: string
  createdAt: string
  updatedAt: string
  employee: Employee
  developmentRoles: {
    id: string
    webDeveloper: boolean
    actuarialBusinessAnalyst: boolean
    agileCoach: boolean
    automationQA: boolean
    dotnetDeveloper: boolean
    devOps: boolean
    infrastructureArchitect: boolean
    javaDeveloper: boolean
    manualQA: boolean
    mathematician: boolean
    scrumMaster: boolean
    solutionArchitect: boolean
    teamLead: boolean
    uxExpert: boolean
    productOwner: boolean
    dataAnalyst: boolean
  }
  guildContribution: {
    id: string
    internalProject: boolean
    education: boolean
    noContribution: boolean
    startup: boolean
    custom: string
  }
  previousGoals: DevelopmentGoal[]
  actualGoals: DevelopmentGoal[]
  amountOfTime: string
  longTermGoals: string
  lookBackNegative: string
  lookBackPositive: string
  lookForward: string
  lastDiscussed: string
}

export interface EvaluationAttribute {
  id: string
  title: string
  description: string
  group: string
  index: number
  evaluations: Evaluation[]
}

export interface Evaluation {
  id: string
  fromWho: Employee
  toWhom: Employee
  updatedAt: string
  comment: string
  evaluation: number
  evaluationAttribute: EvaluationAttribute
}

export interface EvaluationReviewer {
  id: string
  fromWho: Employee
  toWhom: Employee
}

export interface Vacancy {
  id: string
  position: string
  reason: string
  project: Project
  responsibilities: string
  requiredSkills: string
  additionalSkills: string
  locations: Location[]
  isPublished: boolean
  isClosed: boolean
  rotateEmployees: Employee[]
  responsibleEmployees: Employee[]
  editable: boolean
  employeeComment: string
  comment: string
  employeeExperience: string
  englishLevel: string
  stack: string
}

export enum LOCATION {
  SAINT_PETERSBURG = 'SAINT_PETERSBURG',
  KALININGRAD = 'KALININGRAD',
  TOMSK = 'TOMSK',
  ZURICH = 'ZURICH',
}

export type Customer = 'INTERNAL' | 'SWISSRE' | 'ALLIANZ'
export type ProcessType = 'ONBOARDING' | 'OFFBOARDING' | 'ROTATION'

export interface Process {
  id: string
  title: string
  customer: Customer
  nextCustomer: Customer
  type: ProcessType
}

export interface ProcessStep {
  id: string
  type: 'APPROVE' | 'NOTIFY' | 'INDEPENDENT'
  responsibleUsers: Employee[]
  parentSteps: ProcessStep[] | null
  process: Process
  title: string
  description: string
  sendToTeamlead: boolean
  hasComment: boolean
  send24hoursNotification: boolean
}

export interface ProcessExecution {
  id: string
  status: 'RUNNING' | 'FINISHED' | 'CANCELLED' | 'HOLDING'
  process: Process
  vacancy: Vacancy
  locations: LOCATION[]
  project: Project
  employee: string
  finishDate: string
  prio: number
}

export interface ProcessExecutionStep {
  id: string
  execution: ProcessExecution
  description: string
  step: ProcessStep
  isDone: boolean
}

export interface ProcessExecutionComment {
  id: string
  body: string
  employee: Employee
  createdAt: string
  step: ProcessExecutionStep
}

export interface EvaluationComment {
  id?: string
  body: string
  employee?: Employee
  evaluationAttribute?: EvaluationAttribute
  editable?: boolean
}

export interface OfficeDay {
  id: string
  employeeLimit: number
  employeeCount: number
  date: string
  location: LOCATION
}

export interface Stream {
  id: string
  videoId: string
  name: string
  description: string
  duration: string
  privacyMode: string
  likes: number
  views: number
  comments: number
  publishedDate: string
  creatorName: string
  creatorMail: string
  skills: Skill[]
}
export interface Guild {
  id: string
  azureDisplayName: string
  azureId: string
  title: string
  description: string
  shortDescription: string
  leaders: Employee[]
  skills: Skill[]
  accessWrite: boolean
}

export interface WikiRootSection {
  id: string
  title: string
  description: string
  icon: string
  path: string
}
export interface WikiPage {
  id: string
  title: string
  body: string
  path: string
}

export interface Feedback {
  id: string
  about: FEEDBACK_ABOUT
  project: Project
  text: string
  createdAt: string
  comments: FeedbackComment[]
}

export interface FeedbackComment {
  id: string
  text: string
  createdAt: string
}

export enum FEEDBACK_ABOUT {
  COMPANY = 'COMPANY',
  TEAM = 'TEAM',
  EVENT = 'EVENT',
  PORTAL = 'PORTAL',
}

export interface ArchivedMatrixData {
  employeeAzureEmail: string
  compressedData: string
  matrixId: string
}

export interface ArchivedMatrixRaw {
  experiences: {
    level: LEVEL
    skill: {
      id: string
      name: string
    }
    comment: string
  }[]
  matrix: {
    grades: { id: string; title: string }[]
    groups: { id: string; title: string }[]
    skills: {
      id: string
      type: string
      skillId: string
      gradeId: string
      groupId: string
    }[]
  }
  comment: string
}

export interface ArchivedMatrixVersion {
  id: string
  createdAt: string
}

export interface ArchivedDPVersion {
  id: string
  createdAt: string
}

export interface ArchivedDPData {
  compressedData: Exclude<DevelopmentPlan, 'employee'>
}

export interface ArchivedSEFVersion {
  id: string
  createdAt: string
}

export interface ArchivedSEFData {
  compressedData: string
}

export interface WorkplaceType {
  id: string
  coordX: number
  coordY: number
  number: number
  bookings: WorkplaceBookingType[]
}

export interface WorkspacePoolType {
  workspaces: WorkspaceType[]
}

export interface WorkspaceType {
  id: string
  location: LOCATION
  drawing?: string
  workplaces: WorkplaceType[]
  name?: string
}

export interface WorkplaceBookingType {
  id: string
  employeeId: string
  startDate: string
  finishDate: string
}

export interface OnboardingTicket {
  id: string
  title: string
  description: string
  responsible: Employee[]
  isOptional: boolean
  isSwissRe: boolean
  isRequestedByMe: boolean
  requestedEmployees: Employee[]
}

export enum StrapiGroups {
  REVIEWERS,
  FEEDBACK,
  HR_RU,
  WIKI_EDITORS,
  HR_EDITORS,
  NEWS_EDITORS,
  TECH_PORTAL,
  WORKSPACE_PLANNER,
  SYS_ADMINS,
  HR_ADMINS,
  SUPER_USER,
}

export interface Profile {
  id: string
  strapiId: string
  email: string
  location: LOCATION
  strapiGroupsMembership: (keyof typeof StrapiGroups)[]
}
