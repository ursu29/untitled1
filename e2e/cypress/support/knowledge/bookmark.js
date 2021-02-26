export const randomValues = {
  link: `https://${Math.random().toString(36).substring(7)}.com/`,
  skills: ['60377d1ff84074001c07f7d4'],
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
