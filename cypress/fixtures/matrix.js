export const matrix = () => ({
    "data": {
        "employees": [
            {
                "id": "test.employee@syncretis.com",
                "name": "Test Employee",
                "isMe": true,
                "matrices": [
                    {
                        "id": "5f737d09291c53001ef8d1b3",
                        "title": "General Matrix",
                        "description": "Mandatory matrix for all employees",
                        "comment": "some comment",
                        "employeeMatrixId": "6012e249a8239b001ce8c115",
                        "access": {
                            "read": false,
                            "write": false,
                            "__typename": "Access"
                        },
                        "body": {
                            "groups": [
                                {
                                    "id": "cmJPKbq9sU5xZcPJlmHmT",
                                    "title": "Problem solving",
                                    "description": null,
                                    "__typename": "MatrixGroup"
                                },
                                {
                                    "id": "N4BFfM38mMJMkgsCIiSWS",
                                    "title": "Knowledge sharing",
                                    "description": null,
                                    "__typename": "MatrixGroup"
                                },
                                {
                                    "id": "QSt2WBe_ENlJuBQ5navTq",
                                    "title": "Experience Requirements",
                                    "description": null,
                                    "__typename": "MatrixGroup"
                                },
                                {
                                    "id": "rYyg1gm60Yg8t_WcuVxzb",
                                    "title": "Teamwork",
                                    "description": null,
                                    "__typename": "MatrixGroup"
                                },
                                {
                                    "id": "8mREWwTaS9RImSmQSKlGl",
                                    "title": "Foreign language (English)",
                                    "description": null,
                                    "__typename": "MatrixGroup"
                                },
                                {
                                    "id": "uiPhyNyIVw7a8F5cJkIpE",
                                    "title": "Foreign language (German): optional",
                                    "description": null,
                                    "__typename": "MatrixGroup"
                                },
                                {
                                    "id": "WAwtw8mYEY5nHQ4DiRVHx",
                                    "title": "Customer focus",
                                    "description": null,
                                    "__typename": "MatrixGroup"
                                }
                            ],
                            "grades": [
                                {
                                    "id": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "title": "Grade 1",
                                    "description": null,
                                    "__typename": "MatrixGrade"
                                },
                                {
                                    "id": "kOGnW5wAvLi6vPDpS8RMY",
                                    "title": "Grade 2",
                                    "description": null,
                                    "__typename": "MatrixGrade"
                                },
                                {
                                    "id": "A2gKUm589npGXqgBP9g_u",
                                    "title": "Grade 3",
                                    "description": null,
                                    "__typename": "MatrixGrade"
                                },
                                {
                                    "id": "SbGF-AZcBXevdueRwqDUg",
                                    "title": "Grade 4",
                                    "description": null,
                                    "__typename": "MatrixGrade"
                                }
                            ],
                            "skills": [
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db034955bffb80010003ae5",
                                        "name": "Able to execute simple project tasks without supervision. In case of any issues asks for help from colleagues",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "cmJPKbq9sU5xZcPJlmHmT",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db034a55bffb80010003ae6",
                                        "name": "Able to resolve issues without assistance, can find а solution with colleague help, searching through web, digging through source code",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "cmJPKbq9sU5xZcPJlmHmT",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db034b45bffb80010003ae7",
                                        "name": "Can describe high-level architecture of current project",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "cmJPKbq9sU5xZcPJlmHmT",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db034c25bffb80010003ae8",
                                        "name": "Able to decompose problem into atomically subproblems and then find an appropriate solution",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "cmJPKbq9sU5xZcPJlmHmT",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db034cf5bffb80010003ae9",
                                        "name": "Take responsibility when introduce a new technology/approach; Can understand side effect of introducing a new technology",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "cmJPKbq9sU5xZcPJlmHmT",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db034dd5bffb80010003aea",
                                        "name": "Able to dig as deep as possible in a problem domain in order to find the cause of the issue and then fix it",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "cmJPKbq9sU5xZcPJlmHmT",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db6ec095bffb80010003bec",
                                        "name": "Shares experience with colleagues by presentations",
                                        "description": "(even inside a project), workshops, pair programming",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "N4BFfM38mMJMkgsCIiSWS",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db6ec185bffb80010003bed",
                                        "name": "Can do presentations during workshops and provide arguments for ideas, prove concepts",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "N4BFfM38mMJMkgsCIiSWS",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db6ec435bffb80010003bef",
                                        "name": "Able to mentor of at least 1 colleague",
                                        "description": "Or share knowledge within guild activities outside of project  ",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "N4BFfM38mMJMkgsCIiSWS",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db6ec2c5bffb80010003bee",
                                        "name": "Shares knowledge outside of company, participates at a thematic conferences as a speaker, writes technical articles",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "N4BFfM38mMJMkgsCIiSWS",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db6ec565bffb80010003bf0",
                                        "name": "Assess other developers and provide feedback to developers",
                                        "description": "Help them to grow.",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "N4BFfM38mMJMkgsCIiSWS",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db035135bffb80010003aeb",
                                        "name": "< 1.5 years",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "QSt2WBe_ENlJuBQ5navTq",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db0352b5bffb80010003aec",
                                        "name": "1.5 - 3 years",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "QSt2WBe_ENlJuBQ5navTq",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db035365bffb80010003aed",
                                        "name": "3 - 5 years",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "QSt2WBe_ENlJuBQ5navTq",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5db035445bffb80010003aee",
                                        "name": "> 5 years",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "QSt2WBe_ENlJuBQ5navTq",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c7a9a5bffb8001000399b",
                                        "name": "Interpersonal skills: Quickly adapts to the variable work",
                                        "description": "Quickly adapts to the variable work conditions in the project or to the transfer to another project. Positively reacts on feedback and recognizes his/her mistakes.\nBuilds relations in the team/group and creates conditions for the productive work.\nAspires to the common achievement of the team/group goals, heads for brotherhood and solidarity",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c784f5bffb80010003989",
                                        "name": "Interpersonal skills: Exchanges experience with the colleagues",
                                        "description": "Argues his/her point of  view in the conflict situations, is constructional in solving disputable questions.\nExpresses positive expectations relative to others and appreciates investment in work performed by his/her colleagues.",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c78365bffb80010003988",
                                        "name": "Interpersonal skills: Help for the less experienced and qualified employees",
                                        "description": "Determines what kind of support is required for the members of the team.\nParticipates in forming the friendly atmosphere, supports the high team spirit and cooperation.",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c78085bffb80010003987",
                                        "name": "Interpersonal skills: Consults the colleagues",
                                        "description": "If the difficult professional questions appear",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c788b5bffb8001000398b",
                                        "name": "Decision making: Current Status",
                                        "description": "Timely informs his/her direct manager about the status of the current tasks and occurred problems (potential and real)",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c78775bffb8001000398a",
                                        "name": "Decision making: Takes the responsibility for the project",
                                        "description": "Takes the responsibility for the project/group tasks in compliance with his/her role.\nCollects and uses all information, required for making a decision\n",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c78bd5bffb8001000398d",
                                        "name": "Education: Provides professional tutorship",
                                        "description": "Provides professional tutorship/guidance up to 2 people and routinely provides feedback for them during the training\nAdjusts the information presentation form according to the trainees needs",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c78a95bffb8001000398c",
                                        "name": "Education: Identifies talanted employees",
                                        "description": "Identifies talanted employees for the competent employees development in the appropriate area. Provides the professional training for 3-4 people\n",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": "space_boilerplate",
                                    "skill": {
                                        "id": "empty_wia25y32kl",
                                        "name": "Unnamed",
                                        "description": null,
                                        "isMatrixOnly": false,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5fb5073a8751ed001d487c47",
                                        "name": "Interviewies: Constant help with interviewing new people for Company",
                                        "description": null,
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": "space_boilerplate",
                                    "skill": {
                                        "id": "empty_2dlczudd44c",
                                        "name": "Unnamed",
                                        "description": null,
                                        "isMatrixOnly": false,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "pPBvGB3Z2rYuJEexFjV1C",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": "space_boilerplate",
                                    "skill": {
                                        "id": "empty_jrecz3d2p6d",
                                        "name": "Unnamed",
                                        "description": null,
                                        "isMatrixOnly": false,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "pPBvGB3Z2rYuJEexFjV1C",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4c6b5bffb80010003972",
                                        "name": "English: Speach more or less understandable",
                                        "description": "Participation in stand-ups, team meetings. Translates simple documentation\n",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "8mREWwTaS9RImSmQSKlGl",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4c415bffb80010003971",
                                        "name": "English: Short professional discussion",
                                        "description": "Lead a simple Guild presentation. Amount of difficulties is little during dialogue. Supports discussions about everyday topics. ",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "8mREWwTaS9RImSmQSKlGl",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4be45bffb80010003970",
                                        "name": "English: Can support long professional discussion",
                                        "description": "Lead a seminar, long Guild presentation",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "8mREWwTaS9RImSmQSKlGl",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4bba5bffb8001000396f",
                                        "name": "English: Advanced Business English ",
                                        "description": "Easy to talk about everything",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "8mREWwTaS9RImSmQSKlGl",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4d155bffb80010003976",
                                        "name": "German: Speach more or less understandable",
                                        "description": "Participation in stand-ups, team meetings. Translates simple documentation",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "uiPhyNyIVw7a8F5cJkIpE",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4cfe5bffb80010003975",
                                        "name": "German: Short professional discussions",
                                        "description": "Lead a simple Guild presentation. Amount of difficulties is little during dialogue. Supports discussions about everyday topics. Translates complex documentation",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "uiPhyNyIVw7a8F5cJkIpE",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4cdd5bffb80010003974",
                                        "name": "German: Can support long professional discussion",
                                        "description": "Lead a seminar, long Guild presentation",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "uiPhyNyIVw7a8F5cJkIpE",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4cc95bffb80010003973",
                                        "name": "German: Advanced Business German",
                                        "description": "Easy to talk about everything",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "uiPhyNyIVw7a8F5cJkIpE",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4d9e5bffb8001000397a",
                                        "name": "Collaboration: Understands customer's needs",
                                        "description": "",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "WAwtw8mYEY5nHQ4DiRVHx",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4d935bffb80010003979",
                                        "name": "Collaboration: Takes on responsibilities for solving araised customer problems, which are in his/her capacity",
                                        "description": "Able to deliver middle level domain task.",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "WAwtw8mYEY5nHQ4DiRVHx",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4d805bffb80010003978",
                                        "name": "Collaboration: Regulates the effective process of relationship with the customer",
                                        "description": "Able to split big problem domain task on a middle level domain tasks and solve it.",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "WAwtw8mYEY5nHQ4DiRVHx",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5d9c4d335bffb80010003977",
                                        "name": "Collaboration: Forecasts and discoveres customer's (internal and external) needs. ",
                                        "description": "Searches for possibilities to increase the customer satisfaction level of product/serviceUnderstans the buisiness, able to formulate and prepare detailed specification for the big problem domain task. Able to split big problem domain task on a middle level domain tasks and solve it. Strong presentation skills",
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "WAwtw8mYEY5nHQ4DiRVHx",
                                    "gradeId": "SbGF-AZcBXevdueRwqDUg",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5fb5070f8751ed001d487c42",
                                        "name": "Feedback: Open to revieve constructive feedback and percieve it as points for improvements",
                                        "description": null,
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "9d_aBAaQqeIenaJ2ZA1DC",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5fb5071d8751ed001d487c43",
                                        "name": "Feedback: Provide constructive  (positive and negative) feedback to team members to ensure commitment",
                                        "description": null,
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5fb507288751ed001d487c44",
                                        "name": "Feedback: Make sure that people in the team openely discuss ",
                                        "description": null,
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5fb507348751ed001d487c46",
                                        "name": "Interviewies: Have experience to interview new team members to the company or project",
                                        "description": null,
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "rYyg1gm60Yg8t_WcuVxzb",
                                    "gradeId": "A2gKUm589npGXqgBP9g_u",
                                    "__typename": "MatrixSkill"
                                },
                                {
                                    "type": null,
                                    "skill": {
                                        "id": "5fb507548751ed001d487c48",
                                        "name": "English: Business emails skills; Understand communication differences in multicultural environment and behaves accordingly",
                                        "description": null,
                                        "isMatrixOnly": true,
                                        "__typename": "Skill"
                                    },
                                    "groupId": "8mREWwTaS9RImSmQSKlGl",
                                    "gradeId": "kOGnW5wAvLi6vPDpS8RMY",
                                    "__typename": "MatrixSkill"
                                }
                            ],
                            "__typename": "MatrixBody"
                        },
                        "__typename": "Matrix"
                    }
                ],
                "__typename": "Employee"
            }
        ]
    }
})
