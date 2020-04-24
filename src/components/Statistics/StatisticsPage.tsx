import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography, Row, Col } from 'antd'

import { Experience, Level, Skill } from '../../types'
import Skeleton from '../UI/Skeleton'
import PageContent from '../UI/PageContent'
import BarChart from '../UI/BarChart'
import { getSkillLink } from '../../paths'

/**
 * Queries definition
 */
const query = gql`
  query getSkills($input: SkillsInput) {
    levels {
      id
      name
      index
    }
    skills(input: $input) {
      id
      name
      experiences {
        id
        level {
          id
        }
      }
    }
  }
`

/**
 * Types definition
 */
type LevelPick = Pick<Level, 'id' | 'name' | 'index'>

type SkillPick = {
  id: Skill['id']
  name: Skill['name']
  experiences: [
    {
      id: Experience['id']
      level: Pick<Level, 'id'>
    },
  ]
}

type QueryType = {
  levels: LevelPick[]
  skills: SkillPick[]
}

/**
 * Getting skills array with the desired length and levels, sort ascending
 * @param skills - Skill array
 * @param count - Results number; if omit - return all array
 * @param levelId - Skills level; if omit - execute for all levels
 */
const getHighestSkills = (skills: QueryType['skills'], count: number, levelId?: string) =>
  skills
    .map((skill) => ({
      name: skill.name,
      rate: levelId
        ? skill.experiences.filter((el) => el.level.id === levelId).length
        : skill.experiences.length,
      link: getSkillLink(skill.id),
    }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, count)

/**
 * Render function
 */
export default function StatisticsPage() {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: {
      input: {
        noMatrixSkills: true,
      },
    },
  })

  const levels = data?.levels || []
  const skills = data?.skills || []

  // Fill the complete skills array
  const skillsByLevels = [{ index: -1, name: 'Skills', skills: getHighestSkills(skills, 10) }]

  levels.forEach((level) =>
    skillsByLevels.push({
      index: level.index,
      name: level.name,
      skills: getHighestSkills(skills, 5, level.id),
    }),
  )

  // Color pallette for bar charts
  const barPallette = ['#FBBC20', '#88C673', '#70DEC4', '#1890FF', 'red']

  const { Title } = Typography

  // One instance of bar chart
  const barChartContainer = (skillId: number) => (
    <div style={{ marginTop: '50px' }}>
      <Title
        level={4}
      >{`Top ${skillsByLevels[skillId].skills.length} ${skillsByLevels[skillId].name}`}</Title>
      <BarChart
        data={skillsByLevels[skillId].skills}
        dataKey="rate"
        color={barPallette[skillId]}
        marginLeft={skillId === 0 ? '-5px' : ''}
      />
    </div>
  )

  // Show skeleton during loading
  if (loading) {
    return (
      <PageContent>
        <Skeleton active loading />
      </PageContent>
    )
  }

  return (
    <PageContent>
      <Title level={1}>Skills Statistics</Title>
      <Row>
        <Col span={24}>{barChartContainer(0)}</Col>
      </Row>
      <Row>
        <Col span={10}>{barChartContainer(1)}</Col>
        <Col span={10} offset={2}>
          {barChartContainer(2)}
        </Col>
      </Row>
      <Row>
        <Col span={10}>{barChartContainer(3)}</Col>
        <Col span={10} offset={2}>
          {barChartContainer(4)}
        </Col>
      </Row>
    </PageContent>
  )
}
