export const menu = {
  items: [
    { name: 'Onboarding', url: '/onboarding', text: 'Onboarding', show: false },
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
    { name: 'Timemaster', url: '/timemaster', text: null, show: true },
    { name: 'Workspace', url: '/workspace-planner', text: null, show: true },
    { name: 'Office planner', url: '/office-planner', text: null, show: true },
    { name: 'HR Tool', url: '/client/hr', text: null, show: false },
    { name: 'Processes', url: '/client/processes', text: null, show: false },
    { name: 'Matrices', url: '/client/matrices', text: null, show: false },
  ],
}

export const tabs = {
  skill: 'Skills',
  bookMark: 'Bookmarks',
  matrices: 'Matrices',
  personal: 'Personal',
  form: 'Self',
  cv: 'CV',
}

export const locations = [
  { title: 'Saint-Petersburg' },
  { title: 'Tomsk' },
  { title: 'Kaliningrad' },
  { title: 'Zürich' },
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
}

export const spinner = {
  active: '.ant-spin',
}

export const menuEl = {
  allMenu: '.ant-menu',
  item: '.ant-menu-item',
  subItem: '.ant-menu-submenu-title',
  subMenu: '[id="tools$Menu"]',
  subMenuItem: '[id="tools$Menu"] > .ant-menu-item',
  title: '.ant-typography',
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
  button: '.ant-btn-primary',
  buttonPlus: '.ant-btn-dashed',
  delete: '.anticon-close',
  iconDelete: '.anticon-delete',
  annotation: 'postAnnotation',
  title: '#title',
  writePost: '.CodeMirror-sizer',
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
  alert: '.ant-message-notice-content',
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
}

export const process = {
  title: 'process_form_title',
  type: 'process_form_type',
  customer: 'process_form_customer',
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
