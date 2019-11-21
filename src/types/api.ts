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
  status: string
}

export interface Tag {
  id: string
}

export interface Post {
  id: string
  title: string
  body: string
  bodyTranslated: string
  createdAt: string
  updatedAt: string
  sendEmail: boolean
  createdBy: Employee
  updatedBy: Employee
}

export interface Project {
  id: string
  name: string
  code: string
  description: string
  leaders: Employee[]
  employees: Employee[]
}
