const production = process.env.NODE_ENV === 'production'

export const GATEWAY = production ? '/gateway' : process.env.REACT_APP_GATEWAY
export const COLLAPSE_WIDTH = 1200
