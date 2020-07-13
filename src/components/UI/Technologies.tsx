import React, { useState } from 'react'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import SkillTag from '../Skills/SkillTag'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import { Skill } from '../../types'
import Button from './Button'

interface Props {
  technologies: Pick<Skill, 'id' | 'name' | 'description'>[]
  isTitleShown?: boolean
  editable?: boolean
  amount?: number
  handleSave?: Function
  singleRow?: boolean
  emptyString?: string
}

export default function Technologies({
  technologies,
  editable,
  amount,
  handleSave,
  isTitleShown,
  singleRow,
  emptyString,
}: Props) {
  const [isUnderModifying, setIsUnderModifying] = useState(false)
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    technologies.map(({ id, name }) => ({ id, name })),
  )

  const EditButton = () => (
    <Button
      size="small"
      icon={isUnderModifying ? <CheckOutlined /> : <EditOutlined />}
      style={{ marginRight: '8px' }}
      type="link"
      onClick={() => {
        if (
          isUnderModifying &&
          handleSave &&
          technologies
            .map(e => e.id)
            .sort()
            .join('') !==
            selectedTechnologies
              .map(e => e.id)
              .sort()
              .join('')
        ) {
          handleSave({ skills: selectedTechnologies.map(e => e.id) })
        }
        setIsUnderModifying(!isUnderModifying)
      }}
    />
  )

  const showSelect = editable && isUnderModifying
  return (
    <div>
      <div style={{ display: 'flex' }}>
        {isTitleShown && (
          <h6 style={{ fontSize: '18px', margin: 0, marginRight: '10px' }}>Technologies</h6>
        )}
        {editable && !singleRow && <EditButton />}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: singleRow ? 'nowrap' : 'wrap',
          maxWidth: '100%',
          alignItems: 'center',
        }}
      >
        {editable && singleRow && <EditButton />}
        {showSelect ? (
          <div style={{ width: '90%', marginTop: '3px' }}>
            <SkillTreeSelect
              value={selectedTechnologies}
              onChange={value => setSelectedTechnologies(value)}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div
              style={{ display: 'flex', flexWrap: singleRow ? 'nowrap' : 'wrap', height: '35px' }}
            >
              {technologies.slice(0, amount ? amount : undefined).map(e => (
                <SkillTag key={e.id} skill={e} style={{ cursor: 'pointer' }} />
              ))}
            </div>
            {!!amount && technologies.length > amount && (
              <span style={{ marginLeft: '6px', color: 'rgba(0, 0, 0, 0.45)', userSelect: 'none' }}>
                + {technologies.length - amount || 2} more...
              </span>
            )}
            {!technologies.length && (
              <span style={{ color: 'rgba(0, 0, 0, 0.45)', alignSelf: 'center' }}>
                {emptyString || '(not assigned yet)'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
