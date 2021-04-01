export const capacity = (
    id,
    capacityFirst = 40,
    capacitySecond = 60,
    capacityThird = 0
) => ({
  "data": {
    "employee": {
      id,
      "projects": [
        {
          "id": "603f685afe2832001c7e6ea8",
          "name": "CorpSite",
          "code": "guild-corpsite",
          "__typename": "Project"
        },
        {
          "id": "603f685dfe2832001c7e6eca",
          "name": "SwissRe DAL",
          "code": "sr-dal",
          "__typename": "Project"
        },
        {
          "id": "603f595a7ae138001c21fe43",
          "name": "Portal",
          "code": "guild-portal",
          "__typename": "Project"
        }
      ],
      "employeeProjects": [
        {
          "id": "603f685afe2832001c7e6eaa",
          "capacity": capacityFirst,
          "isExtraCapacity": false,
          "project": {
            "id": "603f685afe2832001c7e6ea8",
            "__typename": "Project"
          },
          "__typename": "EmployeeProject"
        },
        {
          "id": "603f685dfe2832001c7e6ecb",
          "capacity": capacitySecond,
          "isExtraCapacity": false,
          "project": {
            "id": "603f685dfe2832001c7e6eca",
            "__typename": "Project"
          },
          "__typename": "EmployeeProject"
        },
        {
          "id": "603f6865fe2832001c7e6f1f",
          "capacity": capacityThird,
          "isExtraCapacity": true,
          "project": {
            "id": "603f595a7ae138001c21fe43",
            "__typename": "Project"
          },
          "__typename": "EmployeeProject"
        }
      ],
      "__typename": "Employee"
    }
  }
})