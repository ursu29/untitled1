export const randomValues = {
  link: `https://${Math.random().toString(36).substring(7)}.com/`,
  skills: ['60267b23c099cf001c7d701e'],
  title: Math.random().toString(36).substring(7),
}
export const bookmark = (link, skills, title) => ({ link, skills, title })

export const bookmarkResponse = (id, likedByMe = false, link, title) => ({
  access: { read: true, write: true, __typename: 'Access' },
  employee: {},
  id,
  likedByMe,
  link,
  title,
  __typename: 'Bookmark',
})
