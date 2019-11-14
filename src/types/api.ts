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
  avatar: string | null
  isMe: boolean
}
