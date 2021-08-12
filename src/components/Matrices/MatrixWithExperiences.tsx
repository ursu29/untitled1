import { Tooltip } from 'antd'
import React, { useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import { MatrixGrade, MatrixGroup, MatrixRow } from './styled'
import { ExperienceDetails } from '../../fragments'
import { Employee, Matrix, ArchivedMatrixRaw } from '../../types'
import URLAction from '../../utils/URLAction'

interface Props {
  matrix: Matrix
  employee?: Pick<Employee, 'id' | 'access'> & {
    experiences: ExperienceDetails[]
  }
  EmployeeSkillExperience: any
  isCurrentTab?: boolean
  archivedExperiences?: ArchivedMatrixRaw['experiences']
  isArchivedChosen?: boolean
}

export default function MatrixWithExperiences({
  matrix,
  employee,
  EmployeeSkillExperience,
  isCurrentTab,
  archivedExperiences,
  isArchivedChosen,
}: Props) {
  const urlAction = new URLAction()

  const { groups = [], grades = [], skills = [] } = matrix?.body || {}

  // List of generated card classNames
  const [cardClassNames, setCardClassNames] = useState([''])

  // Client screen width for event listener
  const [clientWidth, setClientWidth] = useState(0)

  // Add event listener on resize screen for dynamic changing card heights
  useEffect(() => {
    const resizeEvent = debounce(100, () => {
      if (document.documentElement.clientWidth !== clientWidth)
        setClientWidth(document.documentElement.clientWidth)
    })
    window.addEventListener('resize', resizeEvent)
    return () => window.removeEventListener('resize', resizeEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * After the component did mount determine the highest card height value in each row and
   * then apply it to all cards in that row.
   *
   * To do it we assign to all cards new className `matrix_exp-${matrix.id}-${groupIndex}-${skillIndex}`
   * and so we have in each row of the same group equal classNames for all cards like
   * "matrix_exp-id-0-2" - for all cards of the third row of the first group
   *
   * There is a condition before - if that action has been done already at least once -
   * it needs to give all cards their 'auto' height cause to make a new determining of
   * the new max height of the card at the DOM (when screen resizing for instance)
   */
  useEffect(() => {
    // Condition for action has been done already
    if (cardClassNames.length) {
      cardClassNames.forEach(className => {
        document
          .querySelectorAll<HTMLElement>(`div[class*="matrix_exp-${className}"]`)
          .forEach(e => {
            e.style.height = 'auto'
          })
      })
    }

    // Object with key-value pairs of mapping cards className and it's height
    const cardHeights: { [key: string]: number } = {}

    // Go across each row and write to cardHeight maximum card height of that row
    groups.forEach((group, groupIndex) => {
      grades.forEach(grade => {
        skills
          .filter(skill => {
            return (
              skill.groupId.toString() === group.id.toString() &&
              skill.gradeId.toString() === grade.id.toString()
            )
          })
          .forEach((__, skillIndex) => {
            const cardsInRow = document.querySelectorAll<HTMLElement>(
              `div[class*="matrix_exp-${matrix.id}-${groupIndex}-${skillIndex}"]`,
            )

            // If the card has small height - it's empty card (space) - if entire row consists of such - make it hidden
            // Lead to error
            /*             if (
              Array.from(cardsInRow).filter(e => e.offsetHeight < 50).length ===
              Array.from(cardsInRow).length
            )
              cardsInRow.forEach(e => {
                 e.style.display = 'none'
              }) */

            cardsInRow.forEach(e => {
              if (
                !(`${matrix.id}-${groupIndex}-${skillIndex}` in cardHeights) ||
                e.offsetHeight > cardHeights[`${matrix.id}-${groupIndex}-${skillIndex}`]
              ) {
                cardHeights[`${matrix.id}-${groupIndex}-${skillIndex}`] = e.offsetHeight
              }
            })
          })
      })
    })

    setCardClassNames(Object.keys(cardHeights))

    // Assign maximum card height of each row to all cards of that row
    for (const className of Object.keys(cardHeights)) {
      document.querySelectorAll<HTMLElement>(`div[class*="matrix_exp-${className}"]`).forEach(e => {
        e.style.height = cardHeights[className] + 'px'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientWidth, isCurrentTab, matrix, urlAction.paramsGet('matrix'), urlAction.paramsGet('tab')])

  return (
    <div style={{ padding: '8px 0', marginBottom: '20px' }}>
      <MatrixRow>
        {grades.map(grade => (
          <MatrixGrade key={grade.title} style={{ justifyContent: 'center' }}>
            <Tooltip title={grade.description}>
              <span>{grade.title}</span>
            </Tooltip>
          </MatrixGrade>
        ))}
      </MatrixRow>
      {groups.map((group, groupIndex) => (
        <div key={group.id}>
          <MatrixGroup>
            <Tooltip title={group.description}>
              <span>{group.title}</span>
            </Tooltip>
          </MatrixGroup>

          <MatrixRow key={group.title}>
            {grades.map(grade => {
              const content = skills
                .filter(
                  skill =>
                    skill.groupId.toString() === group.id.toString() &&
                    skill.gradeId.toString() === grade.id.toString(),
                )
                .map(({ skill, type }, skillIndex) => {
                  const experience = employee?.experiences.find(i => i.skill?.id === skill?.id)

                  let archivedExperience = null
                  if (isArchivedChosen) {
                    archivedExperience =
                      archivedExperiences?.find(
                        i => i.skill.id?.toString() === skill.id?.toString(),
                      ) || null
                  }

                  return (
                    <EmployeeSkillExperience
                      type={type || null}
                      experience={experience}
                      archivedExperience={archivedExperience}
                      isArchivedChosen={isArchivedChosen}
                      key={skill.id}
                      skill={skill}
                      matrix={matrix}
                      editable={employee?.access.write || false}
                      employee={employee}
                      divClassName={'matrix_exp-' + matrix.id + '-' + groupIndex + '-' + skillIndex}
                    />
                  )
                })
              return <MatrixGrade key={grade.id}>{!!content.length && content}</MatrixGrade>
            })}
          </MatrixRow>
        </div>
      ))}
    </div>
  )
}
