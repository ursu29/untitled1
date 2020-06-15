import React, { useState } from 'react'
import SkillTag from '../Skills/SkillTag'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import { Skill } from '../../types'
import Button from '../UI/Button'

interface Props {
  technologies: Pick<Skill, 'id' | 'name' | 'description'>[]
  editable?: boolean
  shortList?: boolean
  handleSave?: Function
}

export default function Technologies({ technologies, editable, shortList, handleSave }: Props) {
  const [isUnderModifying, setIsUnderModifying] = useState(false)
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    technologies.map(({ id, name }) => ({ id, name })),
  )

  const showSelect = editable && isUnderModifying
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h6 style={{ fontSize: '18px', margin: 0, marginRight: '10px' }}>Technologies</h6>
        {editable && (
          <Button
            size="small"
            icon={isUnderModifying ? 'check' : 'edit'}
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
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%' }}>
        {showSelect ? (
          <SkillTreeSelect
            value={selectedTechnologies}
            onChange={value => setSelectedTechnologies(value)}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', height: '35px' }}>
              {technologies.slice(0, shortList ? 2 : undefined).map(e => (
                <SkillTag key={e.id} skill={e} style={{ cursor: 'pointer' }} />
              ))}
            </div>
            {!!shortList && technologies.length > 2 && (
              <span style={{ marginLeft: '6px', color: 'rgba(0, 0, 0, 0.45)', userSelect: 'none' }}>
                + {technologies.length - 2} more...
              </span>
            )}
            {!technologies.length && (
              <span style={{ color: 'rgba(0, 0, 0, 0.45)', alignSelf: 'center' }}>
                (not assigned yet)
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
