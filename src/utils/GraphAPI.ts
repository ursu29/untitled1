import { GATEWAY } from '../config'
import { User, Group } from '@microsoft/microsoft-graph-types'
import message from '../message'

export default class GraphAPI {
  graphURL: string

  constructor() {
    this.graphURL = `${GATEWAY}/msgraph`
  }

  private queryGet(url: string) {
    return fetch(this.graphURL + url).then(res => res.json())
  }

  private queryPut(url: string, body?: { [key: string]: any }) {
    return fetch(this.graphURL + url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    })
      .then(res => 'done')
      .catch(err => {
        message.error(err)
        return 'error'
      })
  }

  private queryPost(url: string, body?: { [key: string]: any }) {
    return fetch(this.graphURL + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .catch(err => {
        message.error(err)
        return 'error'
      })
  }

  public async getUsers(mails?: string[]): Promise<User[]> {
    return this.queryGet(`/users?mails=${mails || ''}`)
  }

  public async getGroups(names?: string[]): Promise<Group[]> {
    return this.queryGet(`/groups?names=${names || ''}`)
  }

  public async updateUser(id: any, body: { [key: string]: any }): Promise<string> {
    return this.queryPut(`/user/${id}`, body)
  }

  public async createUser(body: { [key: string]: any }): Promise<User> {
    return this.queryPost(`/users`, body)
  }

  public async getUserGroups(mail: string): Promise<Group[]> {
    return this.queryGet(`/usergroups?mail=${mail}`)
  }

  public async getGroupUsers(name: string): Promise<User[]> {
    return this.queryGet(`/groupusers?name=${name}`)
  }

  public async createGroup(body: { [key: string]: any }): Promise<Group> {
    return this.queryPost(`/groups`, body)
  }

  public async updateGroup(id: any, body: { [key: string]: any }): Promise<string> {
    return this.queryPut(`/group/${id}`, body)
  }

  public async addMemberToGroup(groupId?: string, userId?: string): Promise<string> {
    return this.queryPut(`/groupaddmember`, { groupId, userId })
  }

  public async removeMemberFromGroup(groupId?: string, userId?: string): Promise<string> {
    return this.queryPut(`/groupremovemember`, { groupId, userId })
  }
}
