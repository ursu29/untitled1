import { BackTop } from 'antd'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch, RouteProps } from 'react-router-dom'
import { StrapiGroups } from '../../types'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import paths from '../../paths'
import Onboarding from '../Onboarding'
import Employee from '../Employees/EmployeePage'
import Employees from '../Employees/EmployeesPage'
import Feedback from '../Feedback/FeedbackPage'
import Guild from '../Guilds/GuildPage'
import Guilds from '../Guilds/GuildsPage'
import Matrices from '../Matrices/MatricesPage'
import Matrix from '../Matrices/MatrixPage'
import OfficePlanner from '../OfficePlanner/OfficePlannerPage'
import WorkspacePlanner from '../WorkspacePlanner'
import Post from '../Posts/PostPage'
import News from '../Posts/PostsPage'
import Knowledge from '../Knowledge'
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
import Timemaster from '../Timemaster/TimemasterPage'
import Content from '../UI/Content'
import Vacancies from '../Vacancies/VacanciesPage'
import Vacancy from '../Vacancies/VacancyPage'
import WikiPage from '../Wiki/Page'
import Wiki from '../Wiki/WikiPage'
import Management from '../Management'
import Calendar from '../Calendar'
import NotAllowed from '../UI/NotAllowed'
import NotFound from '../UI/NotFound'
import { LibraryPage } from '../Library/LibraryPage'
import DevRel from '../DevRel'
import Snake from '../Snake/SnakePage'
import HobbiesPage from '../hobbies/HobbiesPage'
import HobbyPage from '../hobbies/HobbyPage'
// import WarningPage from '../UI/WarningPage'

export default function Pages() {
  return (
    <Content>
      <Suspense fallback={<div></div>}>
        <BackTop />
        <Switch>
          {/* <Route path="/*" component={WarningPage} /> */}
          <Redirect from="/client/*" to="/*" />
          <Redirect from="/client" to="/" />
          <Redirect exact from="/" to="/profile" />
          <Route path={paths.PROFILE} component={Profile} />
          <Route path={paths.CALENDAR} component={Calendar} />
          <Route path={paths.ONBOARDING} component={Onboarding} />
          <Route path={paths.EMPLOYEES + '/:email'} component={Employee} />
          <Route path={paths.EMPLOYEES} component={Employees} />
          <Route path={paths.PROJECTS + '/:code'} component={Project} />
          <Route path={paths.PROJECTS} component={Projects} />
          <Route path={paths.GUILDS + '/:code'} component={Guild} />
          <Route path={paths.GUILDS} component={Guilds} />
          <Route path={paths.SKILLS + '/:id'} component={Skill} />
          <Route path={paths.SKILLS} component={Skills} />
          <Route path={paths.HOBBIES + '/:id'} component={HobbyPage} />
          <Route path={paths.HOBBIES} component={HobbiesPage} />
          <Route path={paths.STATISTICS} component={Statistics} />
          <Route path={paths.MATRICES + '/:id'} component={Matrix} />
          <Route path={paths.MATRICES} component={Matrices} />
          <Route path={paths.POSTS + '/:id'} component={Post} />
          <Route path={paths.POSTS} component={News} />
          <Route path={paths.PROCESSES + '/:id'} component={Process} />
          <Route path={paths.PROCESSES} component={Processes} />
          <Route path={paths.KNOWLEDGE} component={Knowledge} />
          <Route path={paths.VACANCIES + '/:id'} component={Vacancy} />
          <Route path={paths.VACANCIES} component={Vacancies} />
          <Route path={paths.HR + '/:id'} component={HRProcess} />
          <Route path={paths.HR} component={HR} />
          <Route path={paths.TIMEMASTER} component={Timemaster} />
          <Route path={paths.WIKI + '/:path'} component={WikiPage} />
          <Route path={paths.GUILDS_INFO} component={WikiPage} />
          <Route path={paths.WIKI} component={Wiki} />
          <Route path={paths.OFFICE_PLANNER} component={OfficePlanner} />
          <Route path={paths.WORKSPACE_PLANNER} component={WorkspacePlanner} />
          <Route path={paths.FEEDBACK} component={Feedback} />
          <Route path={paths.LIBRARY} component={LibraryPage} />
          <Route path={paths.DEVREL} component={DevRel} />
          <Route path={paths.GAMES} component={Snake} />
          <PrivateRoute path={paths.MANAGEMENT} component={Management} access={'SUPER_USER'} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Content>
  )
}

function PrivateRoute({
  access,
  ...args
}: { access: keyof typeof StrapiGroups | (keyof typeof StrapiGroups)[] } & RouteProps) {
  return useStrapiGroupCheck(access) ? (
    <Route {...args} />
  ) : (
    <Route {...args} component={NotAllowed} />
  )
}
