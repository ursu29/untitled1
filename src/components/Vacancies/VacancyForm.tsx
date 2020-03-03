import React from 'react'
import { Vacancy } from '../../types'

interface Props {
  vacancy: Partial<Vacancy>
}

function VacancyForm({ vacancy }: Props) {
  return <div>Vacancy form</div>
}

export default VacancyForm
