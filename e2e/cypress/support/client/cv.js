export const employeeCV = {
  curriculumVitae: {},
  id: 'some id',
  __typename: 'Employee',
}

export const curriculumVitaeData = {
  id: 'some id',
  vitaes: [],
  __typename: 'CurriculumVitae',
}

export const vitaeData = {
  company: 'Tet',
  dateEnd: 'date',
  dateStart: 'date',
  id: 'some id',
  level: 'CONFIDENT',
  position: 'front end',
  project: '',
  responsibilities: 'no',
  __typename: 'Vitae',
}

export const project = {
  code: 'is-exro',
  description: ' test',
  id: 'some id',
  name: 'EXRO',
  __typename: 'Project',
}

export const createCapacityObj = (capacity, id, isExtraCapacity) => ({
  capacity,
  id,
  isExtraCapacity
})
