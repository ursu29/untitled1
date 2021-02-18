export const bookmark = {
  createdAt: '6 months ago',
  employee: {},
  access: {},
  id: 'some id',
  likedByMe: false,
  likes: [],
  link: 'https://test.рф',
  skills: [],
  title: 'title',
  __typename: 'Bookmark',
}

export const employee = (email, id, name, __typename) => ({
  email,
  id,
  name,
  __typename,
})

export const bookmarkAccess = { read: true, write: true, __typename: 'Access' }
