export const defaultValues = {
  link: 'https://usehooks.com/',
  skills: ['5d1f24a9aac59500102fab49'],
  title: 'reactHooks',
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
