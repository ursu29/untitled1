import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import 'antd/dist/antd.css'

import EmployeeCard, { Props } from '../components/Employees/EmployeeCard.new'

export default {
  title: 'Example/Employee Card',
  component: EmployeeCard,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta

const employee = {
  name: 'Ken Miles',
  position: 'Frontend developer',
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
}

const Template: Story<Props> = args => (
  <div style={{ maxWidth: 300 }}>
    <EmployeeCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  employee,
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  employee,
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  employee,
}
