export const getEmployeeSkills = () => ({
  data: {
    employees: [
      {
        id: '6038a67a7ae138001c21835d',
        name: 'Test Employee',
        experiences: [
          {
            id: '602cd5a3bb916c001c545264',
            level: 'CONFIDENT',
            skill: {
              id: '602cd4eabb916c001c54145c',
              name: 'Agile',
              description: '',
              isMatrixOnly: false,
              __typename: 'Skill',
            },
            updatedAt: '2021-02-17T15:30:22.177Z',
            __typename: 'Experience',
            comment: null,
          },
          {
            id: '602d4297b4a44d001c04833c',
            level: 'EXPERIENCED',
            skill: {
              id: '602cd4eabb916c001c541464',
              name: 'Coaching',
              description: '',
              isMatrixOnly: false,
              __typename: 'Skill',
            },
            updatedAt: '2021-02-17T16:21:43.954Z',
            __typename: 'Experience',
            comment: null,
          },
          {
            id: '602d4297b4a44d001c04833d',
            level: 'EXPERIENCED',
            skill: {
              id: '602cd4eabb916c001c54146b',
              name: 'Interviewing',
              description: '',
              isMatrixOnly: false,
              __typename: 'Skill',
            },
            updatedAt: '2021-02-17T16:21:43.958Z',
            __typename: 'Experience',
            comment: null,
          },
          {
            id: '602d42a7b4a44d001c04833e',
            level: 'WANTED',
            skill: {
              id: '602cd4ecbb916c001c541530',
              name: 'Databases',
              description: '',
              isMatrixOnly: false,
              __typename: 'Skill',
            },
            updatedAt: '2021-02-17T16:21:59.091Z',
            __typename: 'Experience',
            comment: null,
          },
        ],
        access: {
          read: true,
          write: true,
          __typename: 'Access',
        },
        __typename: 'Employee',
      },
    ],
  },
})
