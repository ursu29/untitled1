export const getCv = (id) => ({
  data: {
    "employeeByEmail": {
      "id": id,
      "curriculumVitae": {
        "id": "6041de13fe2832001c7e7fd3",
        "summary": null,
        "vitaes": [
          {
            "id": "605c7ff938b5de001d50502a",
            "company": "Test Company",
            "dateStart": "2021-03-01",
            "dateEnd": "2021-03-25",
            "project": "",
            "position": "position",
            "responsibilities": "getCV , Responsibilities\t,",
            "level": "2",
            "__typename": "Vitae"
          },
          {
            "id": "605c95f538b5de001d505051",
            "company": "Test company 2",
            "dateStart": "2021-03-25",
            "dateEnd": null,
            "project": "",
            "position": "position2",
            "responsibilities": "",
            "level": "5",
            "__typename": "Vitae"
          }
        ],
        "certificates": [],
        "education": [],
        "__typename": "CurriculumVitae"
      },
      "__typename": "Employee"
    }
  }
})


