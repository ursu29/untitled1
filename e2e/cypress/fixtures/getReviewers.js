export const getReviewers = () => ({
  data: {
    employeeByEmail: {
      id: 'test.employee@syncretis.com',
      developmentPlanReviewers: [
        {
          id: 'A.Vygodchikov@syncretis.com',
          name: 'Alexander Vygodchikov',
          email: 'A.Vygodchikov@syncretis.com',
          __typename: 'Employee',
        },
        {
          id: 'test.manager@syncretis.com',
          name: 'Test Manager',
          email: 'test.manager@syncretis.com',
          __typename: 'Employee',
        },
      ],
      __typename: 'Employee',
    },
  },
})
