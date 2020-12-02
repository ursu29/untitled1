export const response = (id, bool) => ({
  data: {
    profile: {
      id,
      one2oneRequest: bool,
      __typename: 'Employee',
    },
  },
})

export const requestInput = clientId => ({
  input: {
    id: clientId,
    one2oneRequest: true,
  },
})

export const oneTwoOneLocators = {
  bargeSm: '.ant-badge-count-sm',
  bargeCount: '.ant-badge-count',
  bargeCurrent: '.ant-badge-count > .current',
  closeOneTwoOne: '.sc-kGXeez',
}
