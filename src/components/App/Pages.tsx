import React, { Suspense, lazy } from 'react'
import Content from '../UI/Content'
import { Route, Switch, Redirect } from 'react-router-dom'
import paths from '../../paths'
import UnderConstruction from '../UI/UnderConstruction'
import PageContent from '../UI/PageContent'

// const Welcome = () => <PageContent>Welcome</PageContent>
const Placeholder = () => <UnderConstruction />
const PageNotFound = () => <PageContent>Page is not found</PageContent>
const Profile = lazy(() => import('../Profile/ProfilePage'))
const Settings = lazy(() => import('../Settings/SettingsPage'))
const News = lazy(() => import('../News/NewsPage'))
const Post = lazy(() => import('../News/PostPage'))
const Skills = lazy(() => import('../Skills/SkillsPage'))
const Skill = lazy(() => import('../Skills/SkillPage'))
const Files = lazy(() => import('../Files/FilesPage'))
const Employees = lazy(() => import('../Employees/EmployeesPage'))
const Employee = lazy(() => import('../Employees/EmployeePage'))
const Matrices = lazy(() => import('../Matrices/MatricesPage'))

export default function Pages() {
  return (
    <Content>
      <Suspense fallback={<div>Lazy...</div>}>
        <Switch>
          <Route path="/" exact component={Profile} />
          <Route path={paths.PROFILE + '/:tab'} component={Profile} />
          <Route path={paths.PROFILE} component={Profile} />
          <Route path={paths.EMPLOYEES + '/:email/:tab'} component={Employee} />
          <Route path={paths.EMPLOYEES + '/:email'} component={Employee} />
          <Route path={paths.EMPLOYEES} component={Employees} />
          <Route path={paths.PROJECTS} component={Placeholder} />
          <Route path={paths.GUILD_PROJECTS} component={Placeholder} />
          <Route path={paths.SKILLS + '/:id'} component={Skill} />
          <Route path={paths.SKILLS} component={Skills} />
          <Route path={paths.STATS} component={Placeholder} />
          <Route path={paths.BOOKMARKS} component={Placeholder} />
          <Route path={paths.MATRICES + '/:id'} component={Placeholder} />
          <Route path={paths.MATRICES} component={Matrices} />
          <Route path={paths.SHARED_FILES} component={Files} />
          <Route path={paths.NEWS + '/:id'} component={Post} />
          <Route path={paths.NEWS} component={News} />
          <Route path={paths.SETTINGS} component={Settings} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Content>
  )
}
