import React from 'react'
import Select from '../UI/Select'
import gql from 'graphql-tag'
import getSkills, { QueryType } from '../../queries/getSkills'
import { Skill } from '../../types'
import { useQuery, useMutation } from '@apollo/react-hooks'

export const mutation = gql`
  mutation CreateSkill($input: CreateSkillInput) {
    createSkill(input: $input) {
      id
    }
  }
`

// const NotFound = ({ name, onAdd }: any) => {
//   const [mutate] = useMutation(mutation, {
//     variables: { input: { name } },
//     refetchQueries: [{ query: getSkills }],
//   })

//   return (
//     <>
//       <div>Skill is not found</div>
//       <div style={{ padding: '8px', cursor: 'pointer', color: '#333' }} onClick={() => mutate()}>
//         Add item
//       </div>
//     </>
//   )
// }

type SkillPick = Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>

type Props = {
  value?: SkillPick
  onSelect?: (skill: SkillPick) => any
  onBlur?: any
  defaultOpen?: boolean
  autoFocus?: boolean
  matrixSkillsOnly?: boolean
  allowAddNew?: boolean
  wide?: boolean
  size?: 'default' | 'small'
}

export default function SkillSelect({ onSelect, wide, size, ...props }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getSkills)

  return (
    <Select
      style={{ width: wide ? '100%' : 150 }}
      autoFocus={!loading && props.autoFocus}
      loading={loading}
      size={size}
      onBlur={props.onBlur}
      onSelect={id => {
        const skill = data!.skills.find(skill => skill.id === id)
        if (skill) {
          onSelect && onSelect(skill)
        }
      }}
      items={data?.skills
        .filter(skill => {
          if (props.matrixSkillsOnly) return skill.isMatrixOnly
          return true
        })
        .map(skill => {
          return {
            key: skill.id,
            value: skill.name,
          }
        })}
    />
  )
}
