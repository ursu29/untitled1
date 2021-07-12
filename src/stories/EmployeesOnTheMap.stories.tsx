import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Map as EmployeesOnTheMapMapbox, Props } from './EmployeesOnTheMapMapbox'

export default {
  title: 'Employees on the Map',
  component: EmployeesOnTheMapMapbox,
} as Meta

const Template: Story<Props> = args => <EmployeesOnTheMapMapbox {...args} />

export const Mapbox = Template.bind({})
