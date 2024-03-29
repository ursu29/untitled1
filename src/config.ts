const production = process.env.NODE_ENV === 'production'

export const GATEWAY = production ? '' : process.env.REACT_APP_GATEWAY

export const CONTENT_WIDTH = 1440
export const COLLAPSE_WIDTH = 1220
export const NEWS_FEED_WIDTH = 750
export const MENU_WIDTH = 220

export const INDEXED_DB_EMPLOYEE_RETENTION_DAYS = 5
