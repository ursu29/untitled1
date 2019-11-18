import React from 'react'
import Content from '../UI/Content'
import { Route, Switch } from 'react-router-dom'
import paths from '../../paths'

const Welcome = () => <div>Welcome</div>
const Placeholder = () => <div>Page</div>
const PageNotFound = () => <div>Page is not found</div>

export default function Pages() {
  return (
    <Content>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path={paths.PROFILE} component={Placeholder} />
        <Route path={paths.EMPLOYEES} component={Placeholder} />
        <Route path={paths.PROJECTS} component={Placeholder} />
        <Route path={paths.GUILD_PROJECTS} component={Placeholder} />
        <Route path={paths.SKILLS} component={Placeholder} />
        <Route path={paths.STATS} component={Placeholder} />
        <Route path={paths.BOOKMARKS} component={Placeholder} />
        <Route path={paths.MATRICES + '/:id'} component={Placeholder} />
        <Route path={paths.MATRICES} component={Placeholder} />
        <Route path={paths.SHARED_FILES} component={Placeholder} />
        <Route path={paths.NEWS} component={Placeholder} />
        <Route path={paths.SETTINGS} component={Placeholder} />
        <Route path={paths.NEWS + '/presentation'} component={Placeholder} />
        <Route component={PageNotFound} />
      </Switch>
    </Content>
  )
}
