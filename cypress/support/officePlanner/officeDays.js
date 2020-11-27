export const officeEmployee = {
  email: 'email',
  id: 'some id',
  isMe: false,
  location: 'Saint-Petersburg',
  name: 'test name',
  worksFromOffice: [],
  __typename: 'Employee',
}

export const planner = {
  sum: 'employee_sum',
}

export const day = firstDay => ({
  date: firstDay,
  employeeCount: 1,
  employeeLimit: 15,
  id: '5f684b5d72c130001ced0482',
  location: { id: 'some id', code: 'saint_petersburg', __typename: 'Location' },
  __typename: 'OfficeDay',
})

export const officeDays = (employeeLimit, employeeCount, date) => ({
  data: {
    officeDays: [
      {
        id: '5f684b5d72c130001ced0482',
        date,
        employeeLimit,
        employeeCount,
        location: {
          id: '5e56a0129ff50b001c34a41b',
          code: 'saint_petersburg',
          __typename: 'Location',
        },
        __typename: 'OfficeDay',
      },
    ],
  },
})

export const filterEmployeesCount = (data, compareDate) =>
  data.filter(el => el.date === compareDate)

export const employeeMaxCount = (allEmployees, count) =>
  Math.ceil((allEmployees * employeeLimit(count)) / 100)
export const employeeLimit = count => count || 15
export const todaysDate = Cypress.moment().format('YYYY-MM-DD')
export const pastDay = Cypress.moment().subtract(1, 'days').format('YYYY-MM-DD')
export const getFirstDay = Cypress.moment().startOf('isoweek').format('YYYY-MM-DD')
