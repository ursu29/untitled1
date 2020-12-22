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
  id: 'id',
  email: 'ken.miles@sidenis.com',
  isMe: false,
  phoneNumber: '+70009099900',
  name: 'Ken Miles',
  position: 'Frontend developer',
  location: 'Los Angeles',
  country: 'USA',
  startDate: '10.08.2020',
  birthday: '01.10',
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
