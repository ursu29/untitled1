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
export const employeeLimit = count => count || 15
export const todaysDate = Cypress.moment().format('YYYY-MM-DD')
export const tomorrow  = Cypress.moment().add(1,'days').format('DD');
export const nextWeek  = Cypress.moment().add(6,'days').format('YYYY-MM-DD');
export const pastDay = Cypress.moment().subtract(1, 'days').format('YYYY-MM-DD')
export const getFirstDay = Cypress.moment().startOf('isoweek').format('YYYY-MM-DD')
export const todayOfficePlannerDate = Cypress.moment().format('DD.MM.YYYY')
