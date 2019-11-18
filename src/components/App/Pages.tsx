import React, { Suspense, lazy } from 'react'
import Content from '../UI/Content'
import { Route, Switch } from 'react-router-dom'
import paths from '../../paths'
import UnderConstruction from '../UI/UnderConstruction'

const Welcome = () => <div>Welcome</div>
const Placeholder = () => <UnderConstruction />
const PageNotFound = () => <div>Page is not found</div>
const Settings = lazy(() => import('../Settings/SettingsPage'))
const News = lazy(() => import('../News/NewsPage'))

export default function Pages() {
  return (
    <Content>
      <Suspense fallback={<div>Lazy...</div>}>
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
          <Route path={paths.NEWS} component={News} />
          <Route path={paths.SETTINGS} component={Settings} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Content>
  )
}
