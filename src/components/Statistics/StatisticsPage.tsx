import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import gql from 'graphql-tag'
import BarChart from '../UI/BarChart'
import Tabs from '../UI/Tabs'
import { Experience, Level, Skill } from '../../types'
import Skeleton from '../UI/Skeleton'
import PageContent from '../UI/PageContent'

const query = gql`
  query getExperiences($input: ExperiencesInput) {
    levels {
      id
      name
      index
    }
    experiences(input: $input) {
      id
      level {
        id
        index
      }
      skill {
        id
        name
      }
    }
  }
`

type LevelPick = Pick<Level, 'id' | 'name' | 'index'>

type ExperiencePick = {
  id: Experience['id']
  level: Pick<Level, 'id' | 'index'>
  skill: Pick<Skill, 'id' | 'name'>
}

type QueryType = {
  levels: LevelPick[]
  experiences: ExperiencePick[]
}

export default function StatisticsPage() {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: {
      input: {
        noMatrixSkills: true,
      },
    },
  })

  const levels = data?.levels || []
  const experiences = data?.experiences

  const getExperiencesByLevel = (level: number) =>
    experiences?.filter(it => it.level.index === level)
  const getExperiencesNames = (experiences: QueryType['experiences']) =>
    experiences.map(it => ({
      key: it.skill.id,
      value: it.skill.name,
    }))

  let tabs: any = []

  if (experiences) {
    tabs.push({
      title: 'Top skills',
      key: 'top',
      body: <BarChart items={getExperiencesNames(experiences)} />,
    })

    tabs = tabs.concat(
      levels
        .sort((a, b) => a.index - b.index)
        .map(level => {
          const experiences = getExperiencesByLevel(level.index) || []
          return {
            title: level.name,
            key: level.index.toString(),
            body: <BarChart items={getExperiencesNames(experiences)} />,
          }
        }),
    )
  }

  if (loading) {
    return (
      <PageContent>
        <Skeleton active loading />
      </PageContent>
    )
  }

  return (
    <>
      {!experiences && <div>No data provided yet</div>}
      {experiences && <Tabs tabs={tabs} />}
    </>
  )
}
