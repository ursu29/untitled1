import { BackTop } from 'antd'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import paths from '../../paths'
import Bookmarks from '../Bookmarks/BookmarksPage'
import Employee from '../Employees/EmployeePage'
import Employees from '../Employees/EmployeesPage'
import Feedback from '../Feedback/FeedbackPage'
import Files from '../Files/FilesPage'
import Guild from '../Guilds/GuildPage'
import Guilds from '../Guilds/GuildsPage'
import Matrices from '../Matrices/MatricesPage'
import Matrix from '../Matrices/MatrixPage'
import OfficePlanner from '../OfficePlanner/OfficePlannerPage'
import Post from '../Posts/PostPage'
import News from '../Posts/PostsPage'
import Processes from '../Processes/ProcessesPage'
import Process from '../Processes/ProcessPage'
import HRProcess from '../ProcessExecutions/ProcessExecutionPage'
import HR from '../ProcessExecutions/ProcessExecutionsPage'
import Profile from '../Profile/ProfilePage'
import Project from '../Projects/ProjectPage'
import Projects from '../Projects/ProjectsPage'
import Skill from '../Skills/SkillPage'
import Skills from '../Skills/SkillsPage'
import Statistics from '../Statistics/StatisticsPage'
import Stream from '../Stream/StreamPage'
import Timemaster from '../Timemaster/TimemasterPage'
import Content from '../UI/Content'
import PageContent from '../UI/PageContent'
import Vacancies from '../Vacancies/VacanciesPage'
import Vacancy from '../Vacancies/VacancyPage'
import WikiPage from '../Wiki/Page'
import Wiki from '../Wiki/WikiPage'

const PageNotFound = () => <PageContent>Page is not found</PageContent>

export default function Pages() {
  return (
    <Content>
      <Suspense fallback={<div></div>}>
        <BackTop />
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
          <Route path={paths.GUILDS + '/:code'} component={Guild} />
          <Route path={paths.GUILDS} component={Guilds} />
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
          <Route path={paths.STREAM} component={Stream} />
          <Route path={paths.PROCESSES + '/:id'} component={Process} />
          <Route path={paths.PROCESSES} component={Processes} />
          <Route path={paths.VACANCIES + '/:id'} component={Vacancy} />
          <Route path={paths.VACANCIES} component={Vacancies} />
          <Route path={paths.HR + '/:id'} component={HRProcess} />
          <Route path={paths.HR} component={HR} />
          <Route path={paths.TIMEMASTER} component={Timemaster} />
          <Route path={paths.WIKI + '/:path'} component={WikiPage} />
          <Route path={paths.WIKI} component={Wiki} />
          <Route path={paths.OFFICE_PLANNER} component={OfficePlanner} />
          <Route path={paths.FEEDBACK} component={Feedback} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Content>
  )
}
