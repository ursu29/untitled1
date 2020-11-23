import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import 'antd/dist/antd.css'

import EmployeeGroup, { Props } from '../components/Employees/EmployeeGroup.new'

export default {
  title: 'Example/Employee Group',
  component: EmployeeGroup,
} as Meta

const employee = {
  id: 'id',
  email: 'ken.miles@sidenis.com',
  isMe: false,
  phoneNumber: '+70009099900',
  name: 'Ken Miles',
  position: 'Frontend developer',
  location: 'Los Angeles',
  country: 'USA',
}

const Template: Story<Props> = args => <EmployeeGroup {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Group name',
  employees: [employee],
}

export const WithTwoEmployees = Template.bind({})
WithTwoEmployees.args = {
  title: 'Group name',
  employees: [employee, employee],
}

export const WithThreeEmployees = Template.bind({})
WithThreeEmployees.args = {
  title: 'Group name',
  employees: [employee, employee, employee],
}
