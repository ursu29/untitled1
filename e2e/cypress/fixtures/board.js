export const getBoardMock = () => ({
    data: {
        "processExecutions": [
            {
                "id": "603f5a8a7ae138001c225ba1",
                "process": {
                    "id": "603f5a7f7ae138001c225a57",
                    "title": "Onboarding SwissRe",
                    "customer": "SWISSRE",
                    "type": "ONBOARDING",
                    "__typename": "Process"
                },
                "status": "FINISHED",
                "substatus": null,
                "vacancy": {
                    "id": "603f5a877ae138001c225b56",
                    "position": "Java Developer",
                    "isPublished": true,
                    "__typename": "Vacancy"
                },
                "project": {
                    "id": "603f595b7ae138001c21fe52",
                    "name": "SwissRe TCL Squad A",
                    "code": "sr-tcla",
                    "__typename": "Project"
                },
                "projectFrom": null,
                "projectTo": null,
                "locations": [
                    "SAINT_PETERSBURG"
                ],
                "employee": "Georgy Lidskiy",
                "employeeRef": null,
                "finishDate": "2020-10-19",
                "activeStepEmployees": [],
                "prio": 3,
                "updatedAt": "2021-03-03T09:45:08.908Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "607ea36a9cabd7001c637d58",
                "process": {
                    "id": "607ea3699cabd7001c637d55",
                    "title": "test delete title",
                    "customer": "INTERNAL",
                    "type": "ONBOARDING",
                    "__typename": "Process"
                },
                "status": "HOLDING",
                "substatus": null,
                "vacancy": {
                    "id": "607ea36a9cabd7001c637d57",
                    "position": "new position",
                    "isPublished": false,
                    "__typename": "Vacancy"
                },
                "project": {
                    "id": "603f595a7ae138001c21fe43",
                    "name": "Portal",
                    "code": "guild-portal",
                    "__typename": "Project"
                },
                "projectFrom": null,
                "projectTo": null,
                "locations": [
                    "SAINT_PETERSBURG"
                ],
                "employee": "Test Employee",
                "employeeRef": null,
                "finishDate": "2020-12-07",
                "activeStepEmployees": [],
                "prio": 1,
                "updatedAt": "2021-04-20T09:52:15.705Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "60a28465187e18001c1d7a52",
                "process": {
                    "id": "609d06b0903443001c670aea",
                    "title": "T Rotation",
                    "customer": "SWISSRE",
                    "type": "ROTATION",
                    "__typename": "Process"
                },
                "status": "RUNNING",
                "substatus": "SOURCING",
                "vacancy": null,
                "project": null,
                "projectFrom": {
                    "id": "603f595a7ae138001c21fe43",
                    "name": "Portal",
                    "code": "guild-portal",
                    "__typename": "Project"
                },
                "projectTo": {
                    "id": "603f595a7ae138001c21fe43",
                    "name": "Portal",
                    "code": "guild-portal",
                    "__typename": "Project"
                },
                "locations": [
                    "SAINT_PETERSBURG"
                ],
                "employee": null,
                "employeeRef": {
                    "id": "603f592a7ae138001c21f6c4",
                    "name": "Nikolay Kozub",
                    "__typename": "Employee"
                },
                "finishDate": "2021-05-03",
                "activeStepEmployees": [],
                "prio": 1,
                "updatedAt": "2021-05-17T14:59:05.461Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "603f5a8b7ae138001c225c19",
                "process": {
                    "id": "603f5a807ae138001c225a60",
                    "title": "Rotation - Offboarding Allianz - Onboarding SwissRe",
                    "customer": "ALLIANZ",
                    "type": "ROTATION",
                    "__typename": "Process"
                },
                "status": "RUNNING",
                "substatus": "NEW",
                "vacancy": null,
                "project": null,
                "projectFrom": null,
                "projectTo": null,
                "locations": [
                    "TOMSK"
                ],
                "employee": "Test Name",
                "employeeRef": {
                    "id": "603f59277ae138001c21f5dc",
                    "name": "Alexander Bashmakov",
                    "__typename": "Employee"
                },
                "finishDate": "2020-12-07",
                "activeStepEmployees": [
                    {
                        "id": "603f59287ae138001c21f64b",
                        "name": "Julia Kirilova",
                        "email": "julia.kirilova@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59297ae138001c21f67c",
                        "name": "Pavel Rusakov",
                        "email": "pavel.rusakov@syncretis.com",
                        "__typename": "Employee"
                    }
                ],
                "prio": 1,
                "updatedAt": "2021-05-17T16:04:18.099Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "603f5a8b7ae138001c225c15",
                "process": {
                    "id": "603f5a7f7ae138001c225a57",
                    "title": "Onboarding SwissRe",
                    "customer": "SWISSRE",
                    "type": "ONBOARDING",
                    "__typename": "Process"
                },
                "status": "RUNNING",
                "substatus": "OFFER_SENT",
                "vacancy": {
                    "id": "603f5a877ae138001c225b9c",
                    "position": "Manual QA Engineer",
                    "isPublished": true,
                    "__typename": "Vacancy"
                },
                "project": {
                    "id": "603f595b7ae138001c21fe4c",
                    "name": "SwissRe Comet",
                    "code": "sr-comet",
                    "__typename": "Project"
                },
                "projectFrom": null,
                "projectTo": null,
                "locations": [
                    "TOMSK"
                ],
                "employee": "Elena Zeibel",
                "employeeRef": null,
                "finishDate": "2021-02-15",
                "activeStepEmployees": [
                    {
                        "id": "603f59287ae138001c21f64b",
                        "name": "Julia Kirilova",
                        "email": "julia.kirilova@syncretis.com",
                        "__typename": "Employee"
                    }
                ],
                "prio": 2,
                "updatedAt": "2021-05-18T09:37:38.291Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "6052ee6fbb9bcd001d220038",
                "process": {
                    "id": "6052e9d7bb9bcd001d220015",
                    "title": "Test Rotation Process",
                    "customer": "SWISSRE",
                    "type": "ROTATION",
                    "__typename": "Process"
                },
                "status": "RUNNING",
                "substatus": null,
                "vacancy": null,
                "project": null,
                "projectFrom": {
                    "id": "603f595b7ae138001c21fe53",
                    "name": "SwissRe COP",
                    "code": "sr-cop",
                    "__typename": "Project"
                },
                "projectTo": {
                    "id": "603f595a7ae138001c21fe3f",
                    "name": "EXRO -  Exposure Robot",
                    "code": "is-exro",
                    "__typename": "Project"
                },
                "locations": [
                    "KALININGRAD"
                ],
                "employee": null,
                "employeeRef": {
                    "id": "603f59297ae138001c21f671",
                    "name": "Olga Bortsova",
                    "__typename": "Employee"
                },
                "finishDate": "2021-03-22",
                "activeStepEmployees": [],
                "prio": 3,
                "updatedAt": "2021-03-18T06:09:22.573Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "603f5a8b7ae138001c225c1e",
                "process": {
                    "id": "603f5a807ae138001c225a5b",
                    "title": "Offboarding Allianz",
                    "customer": "ALLIANZ",
                    "type": "OFFBOARDING",
                    "__typename": "Process"
                },
                "status": "RUNNING",
                "substatus": "ON_REVIEW",
                "vacancy": null,
                "project": {
                    "id": "603f595a7ae138001c21fe45",
                    "name": "az-mcp",
                    "code": "az-mcp",
                    "__typename": "Project"
                },
                "projectFrom": null,
                "projectTo": null,
                "locations": [
                    "TOMSK"
                ],
                "employee": "Isabekov Emil",
                "employeeRef": {
                    "id": "603f592a7ae138001c21f6c4",
                    "name": "Nikolay Kozub",
                    "__typename": "Employee"
                },
                "finishDate": "2021-02-25",
                "activeStepEmployees": [
                    {
                        "id": "603f592a7ae138001c21f6bf",
                        "name": "Julia Korobkina",
                        "email": "julia.korobkina@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59287ae138001c21f642",
                        "name": "Irina Zaloznykh",
                        "email": "irina.zaloznykh@syncretis.com",
                        "__typename": "Employee"
                    }
                ],
                "prio": 3,
                "updatedAt": "2021-05-17T14:32:19.783Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "6049e8f3bb9bcd001d21fecf",
                "process": {
                    "id": "603f5a807ae138001c225a5a",
                    "title": "Offboarding SwissRe",
                    "customer": "SWISSRE",
                    "type": "OFFBOARDING",
                    "__typename": "Process"
                },
                "status": "RUNNING",
                "substatus": "IN_PROGRESS",
                "vacancy": null,
                "project": {
                    "id": "603f595a7ae138001c21fe3f",
                    "name": "EXRO -  Exposure Robot",
                    "code": "is-exro",
                    "__typename": "Project"
                },
                "projectFrom": null,
                "projectTo": null,
                "locations": [
                    "KALININGRAD"
                ],
                "employee": null,
                "employeeRef": {
                    "id": "603f59277ae138001c21f5d6",
                    "name": "Alexander Vygodchikov",
                    "__typename": "Employee"
                },
                "finishDate": "2021-03-31",
                "activeStepEmployees": [
                    {
                        "id": "603f59287ae138001c21f642",
                        "name": "Irina Zaloznykh",
                        "email": "irina.zaloznykh@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59297ae138001c21f68e",
                        "name": "Stepan Krychkov",
                        "email": "stepan.krychkov@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f592a7ae138001c21f692",
                        "name": "Tatyana Gnezdilova",
                        "email": "tatyana.gnezdilova@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f592a7ae138001c21f6c8",
                        "name": "Alena Blek",
                        "email": "alena.blek@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f592b7ae138001c21f6ed",
                        "name": "Ekaterina Makova",
                        "email": "ekaterina.makova@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59277ae138001c21f5d6",
                        "name": "Alexander Vygodchikov",
                        "email": "a.vygodchikov@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59277ae138001c21f5da",
                        "name": "Alena Makrushina",
                        "email": "alena.makrushina@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59297ae138001c21f67e",
                        "name": "Peter Meyer",
                        "email": "peter.meyer@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59297ae138001c21f68e",
                        "name": "Stepan Krychkov",
                        "email": "stepan.krychkov@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f592a7ae138001c21f6c8",
                        "name": "Alena Blek",
                        "email": "alena.blek@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f592b7ae138001c21f6ed",
                        "name": "Ekaterina Makova",
                        "email": "ekaterina.makova@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59287ae138001c21f642",
                        "name": "Irina Zaloznykh",
                        "email": "irina.zaloznykh@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f592a7ae138001c21f692",
                        "name": "Tatyana Gnezdilova",
                        "email": "tatyana.gnezdilova@syncretis.com",
                        "__typename": "Employee"
                    }
                ],
                "prio": 3,
                "updatedAt": "2021-05-17T09:45:22.372Z",
                "__typename": "ProcessExecution"
            },
            {
                "id": "6049ead4bb9bcd001d21fed5",
                "process": {
                    "id": "603f5a807ae138001c225a68",
                    "title": "Rotation - Onboarding Allianz",
                    "customer": "ALLIANZ",
                    "type": "ROTATION",
                    "__typename": "Process"
                },
                "status": "RUNNING",
                "substatus": null,
                "vacancy": null,
                "project": null,
                "projectFrom": {
                    "id": "603f595a7ae138001c21fe40",
                    "name": "Riskmarket",
                    "code": "is-riskmarket",
                    "__typename": "Project"
                },
                "projectTo": {
                    "id": "603f595a7ae138001c21fe43",
                    "name": "Portal",
                    "code": "guild-portal",
                    "__typename": "Project"
                },
                "locations": [
                    "KALININGRAD"
                ],
                "employee": null,
                "employeeRef": {
                    "id": "603f59287ae138001c21f61a",
                    "name": "Dmitry Babich",
                    "__typename": "Employee"
                },
                "finishDate": "2021-03-24",
                "activeStepEmployees": [
                    {
                        "id": "603f59287ae138001c21f63a",
                        "name": "Igor Kovalev",
                        "email": "igor.kovalev@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59297ae138001c21f67c",
                        "name": "Pavel Rusakov",
                        "email": "pavel.rusakov@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f592a7ae138001c21f6bf",
                        "name": "Julia Korobkina",
                        "email": "julia.korobkina@syncretis.com",
                        "__typename": "Employee"
                    },
                    {
                        "id": "603f59297ae138001c21f670",
                        "name": "Olga Babich",
                        "email": "olga.babich@syncretis.com",
                        "__typename": "Employee"
                    }
                ],
                "prio": 3,
                "updatedAt": "2021-03-11T10:03:21.012Z",
                "__typename": "ProcessExecution"
            },
        ]
    }
})