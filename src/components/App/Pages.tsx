import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import paths from '../../paths'
import Content from '../UI/Content'
import PageContent from '../UI/PageContent'

const PageNotFound = () => <PageContent>Page is not found</PageContent>
const Profile = lazy(() => import('../Profile/ProfilePage'))
const News = lazy(() => import('../Posts/PostsPage'))
const Post = lazy(() => import('../Posts/PostPage'))
const Skills = lazy(() => import('../Skills/SkillsPage'))
const Skill = lazy(() => import('../Skills/SkillPage'))
const Files = lazy(() => import('../Files/FilesPage'))
const Statistics = lazy(() => import('../Statistics/StatisticsPage'))
const Bookmarks = lazy(() => import('../Bookmarks/BookmarksPage'))
const Employees = lazy(() => import('../Employees/EmployeesPage'))
const Employee = lazy(() => import('../Employees/EmployeePage'))
const Matrices = lazy(() => import('../Matrices/MatricesPage'))
const Matrix = lazy(() => import('../Matrices/MatrixPage'))
const Projects = lazy(() => import('../Projects/ProjectsPage'))
const Project = lazy(() => import('../Projects/ProjectPage'))
const Process = lazy(() => import('../Processes/ProcessPage'))
const Processes = lazy(() => import('../Processes/ProcessesPage'))
const Vacancies = lazy(() => import('../Vacancies/VacanciesPage'))
const Vacancy = lazy(() => import('../Vacancies/VacancyPage'))
const HR = lazy(() => import('../HR/HRProcessesPage'))
const HRProcess = lazy(() => import('../HR/HRProcessPage'))
const Timemaster = lazy(() => import('../Timemaster/TimemasterPage'))

export default function Pages() {
  return (
    <Content>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Redirect exact from="/" to="/profile" />
          <Route path={paths.PROFILE + '/:tab'} component={Profile} />
          <Route path={paths.PROFILE} component={Profile} />
          <Route path={paths.EMPLOYEES + '/:email/:tab'} component={Employee} />
          <Route path={paths.EMPLOYEES + '/:email'} component={Employee} />
          <Route path={paths.EMPLOYEES} component={Employees} />
          <Route path={paths.PROJECTS + '/:code/:tab'} component={Project} />
          <Route path={paths.PROJECTS + '/:code'} component={Project} />
          <Route path={paths.PROJECTS} component={Projects} />
          <Route path={paths.SKILLS + '/:id:/:tab'} component={Skill} />
          <Route path={paths.SKILLS + '/:id'} component={Skill} />
          <Route path={paths.SKILLS} component={Skills} />
          <Route path={paths.BOOKMARKS} component={Bookmarks} />
          <Route path={paths.MATRICES + '/:id'} component={Matrix} />
          <Route path={paths.MATRICES} component={Matrices} />
          <Route path={paths.SHARED_FILES} component={Files} />
          <Route path={paths.POSTS + '/:id'} component={Post} />
          <Route path={paths.POSTS} component={News} />
          <Route path={paths.STATISTICS} component={Statistics} />
          {/* <Route path={paths.PROCESSES + '/:id'} component={Process} />
          <Route path={paths.PROCESSES} component={Processes} />
          <Route path={paths.VACANCIES + '/:id'} component={Vacancy} />
          <Route path={paths.VACANCIES} component={Vacancies} />
          <Route path={paths.HR + '/:id'} component={HRProcess} />
          <Route path={paths.HR} component={HR} /> */}
          <Route path={paths.TIMEMASTER} component={Timemaster} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Content>
  )
}
