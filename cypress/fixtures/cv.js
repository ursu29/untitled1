export const getCv = () => ({
  "data": {
    "employeeByEmail": {
      "id": "test.employee@syncretis.com",
      "curriculumVitae": {
        "id": "60098d16a8239b001ce8bcec",
        "vitaes": [
          {
            "id": "60098d16a8239b001ce8bced",
            "company": "Test company",
            "dateStart": "2021-01-21T14:18:01.834Z",
            "dateEnd": "2021-02-23T12:53:43.112Z",
            "project": "",
            "position": "qa ",
            "responsibilities": "responsible for assessing the quality of specifications and technical design documents in order",
            "level": "master",
            "__typename": "Vitae"
          },
          {
            "id": "60194b8aa8239b001ce8c1de",
            "company": "Syncretis",
            "dateStart": "2021-02-15T12:54:54.023Z",
            "dateEnd": null,
            "project": "guild-portal",
            "position": "font",
            "responsibilities": "Determining the structure and design of web pages.\nEnsuring user experience determines design choices.\nDeveloping features to enhance the user experience.\nStriking a balance between functional and aesthetic design.",
            "level": "",
            "__typename": "Vitae"
          }
        ],
        "__typename": "CurriculumVitae"
      },
      "__typename": "Employee"
    }
  }
})
