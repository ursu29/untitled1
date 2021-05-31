export const officeEmployee = {
  email: 'email',
  id: 'some id',
  isMe: false,
  location: 'Saint-Petersburg',
  name: 'test name',
  __typename: 'Employee',
}

export const planner = {
  sum: 'employee_sum',
}

export const day = firstDay => ({
  date: firstDay,
  employeeLimit: 15,
  id: '5f684b5d72c130001ced0482',
  location: 'saint_petersburg',
  __typename: 'OfficeDay',
})

export const officeDays = (employeeLimit, date) => ({
  data: {
    officeDays: [
      {
        id: '5f684b5d72c130001ced0482',
        date,
        employeeLimit,
        employees: [
          {
            id: '60267b07c099cf001c7d6e34',
            __typename: 'Employee',
          },
        ],
        location: 'SAINT_PETERSBURG',
        __typename: 'OfficeDay',
      },
    ],
  },
})

export const filterEmployeesCount = (data, compareDate) =>
  data.filter(el => el.date === compareDate)

export const employeeMaxCount = (allEmployees, count) =>
  Math.ceil((allEmployees * employeeLimit(count)) / 100)

const dayjs = require('dayjs')

export const employeeLimit = count => count || 15
export const getDayAndMonth = number => dayjs().add(number,'days').format('DD.MM')
export const todaysDate = dayjs().format('YYYY-MM-DD')
export const tomorrow  = dayjs().add(1,'days').format('DD');
export const nextWeek  = dayjs().add(6,'days').format('YYYY-MM-DD');
export const pastDay = dayjs().subtract(1, 'days').format('YYYY-MM-DD')
export const getFirstDay = dayjs().startOf('isoweek').format('YYYY-MM-DD')
export const todayOfficePlannerDate = dayjs().format('DD.MM.YYYY')
