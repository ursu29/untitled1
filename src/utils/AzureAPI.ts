import jwt from 'jsonwebtoken'

export class AzureAPI {
  token: string | null
  oid: string

  constructor(token: string | null) {
    this.token = token
    //@ts-ignore
    this.oid = (jwt.decode(token) as any)?.oid
  }

  private query(url: string, init?: RequestInit) {
    // return fetch(AZURE_GRAPH_URL + url, {
    //   ...init,
    //   headers: { Authorization: `Bearer ${this.token}`, ...init?.headers },
    // }).then(res => res.json())
  }

  public async getGroups() {
    return this.query(`users/${this.oid}/memberOf`)
  }
}

/* 
try {
  let memberOf = await client
    .api('/users/da5ec8b3-6a6a-4b11-b1c2-36be0509ece2/memberOf')
    .get()
  console.log(memberOf)
} catch (error) {
  throw error
}
 */
