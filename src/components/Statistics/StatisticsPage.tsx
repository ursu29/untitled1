import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography, Row, Col, Button } from 'antd'

import { Experience, Skill, LEVEL } from '../../types'
import Skeleton from '../UI/Skeleton'
import PageContent from '../UI/PageContent'
import BarChart from '../UI/BarChart'
import { getSkillLink } from '../../paths'
import SkillStatistic from './SkillStatistic'

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
        level
      }
    }
  }
`

/**
 * Types definition
 */

type SkillPick = {
  id: Skill['id']
  name: Skill['name']
  experiences: [
    {
      id: Experience['id']
      level: LEVEL
    },
  ]
}

type QueryType = {
  levels: LEVEL[]
  skills: SkillPick[]
}

/**
 * Getting skills array with the desired length and levels, no-zero rate, sort rate ascending
 * @param skills - Skill array
 * @param count - Results number;
 * @param levelId - Skills level; if omit - execute for all levels
 */
const getHighestSkills = (skills: QueryType['skills'], count: number, levelId?: string) =>
  skills
    .map(skill => ({
      name: skill.name,
      rate: levelId
        ? skill.experiences.filter(el => el.level === levelId).length
        : skill.experiences.length,
      link: getSkillLink(skill.id),
    }))
    .sort((a, b) => b.rate - a.rate)
    .filter(skill => skill.rate > 0)
    .slice(0, count)

/**
 *
 *
 * Render function
 *
 *
 */
export default function StatisticsPage() {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: {
      input: {
        noMatrixSkills: true,
      },
    },
  })

  const [isSkillChosen, setIsSkillChosen] = useState(false)
  const [skillChosen, setSkillChosen] = useState([{ name: '', rate: 0, link: '' }])
  const [skillChosenTitle, setSkillChosenTitle] = useState('')

  const isMakeTitleColumn = useMediaQuery({ maxWidth: 520 })

  const levels = data?.levels || []
  const skills = data?.skills || []

  // Fill the complete skills array
  const skillsByLevels = [
    { id: 'none', index: -1, name: 'Skills', skills: getHighestSkills(skills, 10) },
  ]

  levels.forEach(level =>
    skillsByLevels.push({
      id: level,
      index: Object.keys(LEVEL).indexOf(level),
      name: level,
      skills: getHighestSkills(skills, 5, level),
    }),
  )

  // Color pallette for bar charts
  const barPallette = ['#FBBC20', '#88C673', '#70DEC4', '#1890FF', '#21DEEA']

  const { Title } = Typography

  // One instance of bar chart
  const barChartContainer = (skillId: number) => (
    <div style={{ marginTop: '50px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: isMakeTitleColumn ? 'column' : 'row',
          alignItems: 'baseline',
        }}
      >
        <div>
          <Title
            level={4}
          >{`Top ${skillsByLevels[skillId].skills.length} ${skillsByLevels[skillId].name}`}</Title>
        </div>
        <div
          style={{
            fontFamily: 'Segoe UI, Arial',
            fontSize: '14px',
            color: '#1890FF',
            marginLeft: '20px',
            cursor: 'pointer',
          }}
          onClick={() => handleCheckAllClick(skillId, skills)}
        >
          Check All
        </div>
      </div>
      <BarChart
        data={skillsByLevels[skillId].skills}
        dataKey="rate"
        color={barPallette[skillId]}
        marginLeft={skillId === 0 ? '-5px' : ''}
      />
    </div>
  )

  // Clicked on 'check all' button
  const handleCheckAllClick = (skillId: number, skills: QueryType['skills']) => {
    const levelId = skillsByLevels[skillId].id

    if (levelId === 'none') {
      setSkillChosen(getHighestSkills(skills, 1000))
      setSkillChosenTitle('All')
    } else {
      setSkillChosen(getHighestSkills(skills, 1000, levelId))
      setSkillChosenTitle(levels.find(level => level === levelId) || '')
    }

    setIsSkillChosen(true)
    window.scrollTo(0, 0)
  }

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
      {isSkillChosen ? (
        <>
          <Button
            icon={<ArrowLeftOutlined />}
            size="small"
            style={{ borderColor: 'transparent', paddingLeft: 0, marginBottom: 4 }}
            type="ghost"
            onClick={() => setIsSkillChosen(false)}
          >
            Back
          </Button>
          <SkillStatistic items={skillChosen} title={skillChosenTitle} itemsSliceCount={1000} />
        </>
      ) : (
        <>
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
        </>
      )}
    </PageContent>
  )
}
