import { RouteComponentProps, useHistory } from 'react-router-dom'

export default class URLAction {
  params: URLSearchParams
  history: RouteComponentProps['history']

  constructor() {
    const history = useHistory()
    this.params = new URLSearchParams(history.location.search)
    this.history = history
  }

  paramsSet(key: string, value: string) {
    this.params.set(key, value)
    this.history.push({ search: `?${this.params}` })
    return this
  }
  paramsDelete(key: string) {
    this.params.delete(key)
    this.history.push({ search: `?${this.params}` })
    return this
  }
  paramsClear() {
    this.params = new URLSearchParams()
    this.history.push({ search: `` })
    return this
  }
  paramsGet(key: string) {
    return this.params.get(key) || undefined
  }
}
