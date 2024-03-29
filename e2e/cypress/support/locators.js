export const menu = {
  items: [
    { name: 'Trainings', url: '/onboarding', text: 'Trainings', show: true },
    { name: 'Employees', url: '/employees', text: null, show: true },
    { name: 'Projects', url: '/projects', text: 'Projects', show: true },
    { name: 'Guild', url: '/guilds', text: 'Guilds', show: true },
    { name: 'Skills', url: '/skills', text: 'Skills', show: true },
    { name: 'News', url: '/feed', text: 'News', show: true },
    { name: 'Vacancies', url: '/vacancies', text: 'Open vacancies', show: true },
    { name: 'Knowledge', url: '/knowledge', text: 'Knowledge', show: true },
    { name: 'WIKI', url: '/wiki', text: 'Wiki', show: true },
    { name: 'Feedback', url: '/feedback', text: 'Feedback', show: true },
  ],
  subMenu: [
    { name: 'HR Tool', url: '/hr', text: null, show: false },
    { name: 'Processes', url: '/processes', text: null, show: false },
    { name: 'Matrices', url: '/matrices', text: null, show: false },
    { name: 'Management', url: '/management', text: null, show: false },
  ],
}

export const mainCity = 'SAINT_PETERSBURG'
export const LOCATIONS = ['SAINT_PETERSBURG', 'KALININGRAD', 'TOMSK', 'ZURICH']

export const guildElements = {
  update: 'Edit',
  title: 'title',
  lead: 'leads',
  submit: 'submit',
  mainTitle: 'guildTitle',
  employeeCard: 'employeeCard'
}

export const tabs = {
  skill: 'Skills',
  bookMark: 'Bookmarks',
  matrices: 'Matrices',
  personal: 'Personal',
  form: 'Self',
  cv: 'CV',
}

export const feedbackEl = {
  about: 'about',
  project: 'project',
  response :'feedback',
  send: 'post'
}
export const skillEl = {
  item: '.ant-select-selection-item',
  remove: '.ant-select-selection-item-remove',
  skill: '.ant-select-tree-title',
  iconChecked: '.anticon-check',
  iconEdit: '.anticon-edit',
  successMes: '.ant-message-success',
  message: '.ant-message',
  skillName: 'skills_name',
  select: '.ant-select-multiple',
  titleTree: '.ant-tree-title',
  searchInput: 'search',
  name: 'skillName',
  skillId: 'name',
  description: 'description',
  submit: 'submit',
  selectSkill :'portal-select',
  skillsEvent:'.ant-select-selection-overflow',
  headerTableSkills: '.ant-table-thead',

}

export const locations = [
  { title: 'Saint Petersburg' },
  { title: 'Tomsk' },
  { title: 'Kaliningrad' }
  ]

export const devMenu = {
  menu: '.ant-select-selection-search',
  items: '.ant-select-selection-item',
  item: '.ant-select-item',
  itemLabel: '.ant-form-item-label',
}

export const table = {
  secondTypography: '.ant-typography-secondary',
  activeTab: '.office-planner-active',
  itemList: '.ant-list-item',
  tableRow: '.ant-table-row',
  filter: '.ant-table-filter-trigger-container',
  dropdownMenu: '.ant-dropdown-menu-item',
  resetBtn: 'reset',
  inputSearch: 'search',
  searchBtn: 'btnSearch',
  picker: '.ant-picker-cell-inner',
  range: 'rangeBtn'
}

export const hr = {
  bottom: 'bottom',
  name: 'portal-select',
  phone: 'phone',
  saveBtn: 'saveEmployee',
  tableRow: '.ant-table-row',
  filter: '.ant-table-filter-trigger-container',
  dropdownMenu: '.ant-dropdown-menu-item',
  resetBtn: 'reset',
  inputSearch: 'search',
  searchBtn: 'btnSearch',
}

export const spinner = {
  active: '.ant-spin',
}

export const card = {
  title: '.ant-card-meta-title',
}

export const menuEl = {
  allMenu: '.ant-menu',
  item: '.ant-menu-item',
  subItem: '.ant-menu-submenu-title',
  subMenu: '[id="tools$Menu"]',
  subMenuItem: '.ant-menu-item-only-child',
  title: '.ant-typography',
  back: 'arrow-left'
}

export const postEl = {
  posts: '.ant-timeline',
  post: '.ant-timeline-item',
  editPost: '.anticon-edit',
  tag: '.ant-tag-blue',
  loader: '.anticon-loading',
  buttonSwitch: '.ant-switch',
  toggle: '.ant-switch-checked',
  editTag: '.ant-select-selection-item-content',
  itemsSelect: '.ant-select-item-option-content',
  successTag: '.ant-tag-success',
  mainTag: '.ant-tag',
  button: '.ant-btn-primary',
  buttonPlus: '.ant-btn-dashed',
  delete: '.anticon-close',
  iconDelete: '.anticon-delete',
  annotation: 'postAnnotation',
  title: '#title',
  writePost: '.CodeMirror-sizer',
  edit: '.ant-drawer-title',
  close: '.ant-drawer-close'
}

export const matrix = {
  matrices: 'Matrices',
  knowledge: 'legend-buttons',
  matrixBtn: 'matrix-btn',
  item: '.ant-select-item-option-content',
  delete: 'delete-matrix',
  matrixName: 'QA Matrix',
  matrixTabs: '.ant-tabs-tab',
  success: '.ant-message-success',
  error: '.ant-message-error',
  alert: '.ant-message-notice-content',
  createMatrix: 'createMatrix',
  title: 'titleMatrix',
  description: 'description',
  submit: 'submit'
}

export const notificationsText = {
  errorSef: 'You cannot change your own reviewers list',
  deleteReviewer:  'Reviewer removed',
  addReviewer: 'Reviewer added',
  updateSeF: 'Evaluation form is updated'
}

export const workspace = {
  disabled: {
    selectDisabled: '.ant-select-disabled',
    pickerDisabled: '.ant-picker-disabled',
    checkBoxDisabled: '.ant-checkbox-wrapper-disabled',
  },
  spinner: '.anticon-spin',
  img: '[alt="drawing"]',
  tab: '.ant-tabs-tab-btn',
  activeTab: 'ant-tabs-tab-active',
  data: '.ant-picker-input',
  checkbox: '.ant-checkbox',
  checked: '.ant-checkbox-checked',
  create: 'create',
  cancel: 'cancel',
  activePicker: '.ant-picker-input-active',
  numberOfPeople: 'count'
}

export const paginationEl = {
  number: el => `.ant-pagination-item-${el}`,
}

export const hrTool = {
  prio: 'prio',
  activeIdProcess: 'process',
  create: 'create',
  abort: 'abort',
  errorMess: '.ant-form-item-explain-error',
  processName: 'portal-select',
  selectItem: '.ant-legacy-form-item-children',
  position: 'position',
  option: '.ant-select-item-option-active',
  level: 'level',
  skills: 'skills',
  experience: 'experience',
  description: 'description',
  workDescription: 'workDescription',
  plus: 'plus',
  stack: 'stack',
  publishBtn: 'publish'
}

export const devRelFormEl = {
  title: 'title',
  date: 'date',
  activeData: '.ant-picker-input-active',
  link: 'link',
  submit: 'submit',
  article: 'addArticle',
  articleTab: 'file-text',
  resource: 'resource'
}

export const process = {
  title: 'title',
  type: 'type',
  customer: 'customer',
  newEvent: 'proposeEvent',
  participate: 'participate',
  create: 'addNewEvent',
  declineBtn: 'decline',
  acceptBtn: 'accept'
}

export const notificationEl = {
  title: '.ant-notification-notice-message',
  button: '.ant-btn',
  errIframe: 'tm_iframe',
}

export const modalEl = {
  window: '.ant-modal',
}

export const collapseProcess = {
  header: '.ant-collapse-header',
  arrow: '.ant-collapse-arrow',
}

export const employeeAccess = {
  employeeUrl: '/employees/a.vygodchikov@syncretis.com/',
}

export const personalDevLocators = {
  negative: 'lookBackNegative',
  positive: 'lookBackPositive',
  forward: 'lookForward',
  deleteGoals: 'delete',
  achieveBtn: 'achieve'
}

export const selfEvalForm = {
  needsBtn: 'needs',
  meetsBtn: 'meets',
  exceedsBtn: 'exceeds',
  fillComment: 'fillComment',
  comment: 'comment'
}

export const workExperienceElement = {
  companyTitle: `workExperience`
}

export const caretDown = {
  caretDownButton: 'caret-down'
}

export const tableTr = {
  tableString: '[data-row-key]'
}