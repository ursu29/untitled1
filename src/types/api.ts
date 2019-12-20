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
  bonuses: number | null
  avatar: string
  status: string
  access: Access
  experiences: Experience[]
  matrices: Matrix[]
}

export interface Tag {
  id: string
}

export interface Post {
  id: string
  title: string
  body: string
  isTranslated: boolean
  titleTranslated: string
  bodyTranslated: string
  createdAt: string
  updatedAt: string
  locations: string[]
  createdBy: Employee
  updatedBy: Employee
  images: File[]
  tags: Tag[]
}

export interface Project {
  id: string
  name: string
  code: string
  description: string
  leaders: Employee[]
  employees: Employee[]
  access: Access
}

export interface File {
  id: string
  url: string
  fileName: string
  createdAt: string
  createdBy: Employee | null
  updatedBy: Employee | null
  updatedAt: string
  size: number
  type: 'presentation' | 'video' | 'image'
}

export interface Bookmark {
  id: string
  title: string
  link: string
  employee: Employee
  skills: Skill[]
  likes: Bookmarklike[]
  access: Access
  createdAt: string
  likedByMe: boolean
}

export interface Bookmarklike {
  id: string
  employee: Employee
  bookmark: Bookmark
}

export interface Access {
  read: boolean
  write: boolean
}

export interface MatrixSkill {
  id: string
  skill: Skill
  gradeId: string
  groupId: string
}
export interface MatrixGroup {
  id: string
  title: string
  description: string
}

export interface MatrixGrade {
  id: string
  title: string
  description: string
}

export interface Matrix {
  id: string
  title: string
  description: string
  body: {
    grades: MatrixGrade[]
    groups: MatrixGroup[]
    skills: MatrixSkill[]
  }
  access: Access
}

export interface Experience {
  id: string
  skill: Skill
  employee: Employee
  level: Level
}

export interface Level {
  id: string
  index: number
  name: string
  description: string
  experiences: Experience[]
}

export interface Tag {
  id: string
  name: string
  description: string
  posts: Post[]
}
