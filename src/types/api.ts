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
  location: string
  phoneNumber: string
  email: string
  isMe: boolean
  bonuses: number
  avatar: string
}

export interface Tag {
  id: string
}

export interface PostBody {
  id: string
  languageCode: string
  body: string
}

export interface Post {
  id: string
  title: string
  postbodies: PostBody[]
  createdAt: string
  updatedAt: string
  sendEmail: boolean
  createdBy: Employee
  updatedBy: Employee
}
