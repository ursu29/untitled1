export const matrix = () => ({
  data:  {
    "employees": [
      {
        "id": "603f592a7ae138001c21f6bc",
        "name": "Test Employee",
        "isMe": false,
        "matrices": [
          {
            "id": "603f5a657ae138001c225310",
            "title": "General Matrix",
            "description": "Mandatory matrix for all employees",
            "comment": null,
            "employeeMatrixId": "60c8b122a746fa001c3273fe",
            "access": {
              "read": true,
              "write": true,
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
                  "id": "3rXAvyNzSsL620bhLf-lW",
                  "skill": {
                    "id": "603f594c7ae138001c21fab1",
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
                  "id": "NtjIrRpl0mxK1DCeqshRk",
                  "skill": {
                    "id": "603f594c7ae138001c21fab2",
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
                  "id": "TNQgE1QePXYBLBnljMl7J",
                  "skill": {
                    "id": "603f594c7ae138001c21fab3",
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
                  "id": "HjJuoAo6Rj52bEPZwnCOQ",
                  "skill": {
                    "id": "603f594c7ae138001c21fab4",
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
                  "id": "ScxKyaaQLYYu2w7fvwRu-",
                  "skill": {
                    "id": "603f594c7ae138001c21fab5",
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
                  "id": "hCJbsyJ_GltCQgiRWX7CB",
                  "skill": {
                    "id": "603f594c7ae138001c21fab6",
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
                  "id": "TgT_9K6eyCVflcv9Q8dfp",
                  "skill": {
                    "id": "603f594f7ae138001c21fbae",
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
                  "id": "z5Jbx3hcSedNOS__Q-n0R",
                  "skill": {
                    "id": "603f594f7ae138001c21fbaf",
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
                  "id": "4dVHbSiftSumfqhcj5v8Z",
                  "skill": {
                    "id": "603f594f7ae138001c21fbb1",
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
                  "id": "YUrRyVijIm3nSW82sQv7M",
                  "skill": {
                    "id": "603f594f7ae138001c21fbb0",
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
                  "id": "4ogwiPfF6Z4LJV3Vfo6U2",
                  "skill": {
                    "id": "603f594f7ae138001c21fbb2",
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
                  "id": "fG2PnNTePnjXi3S1gRRPk",
                  "skill": {
                    "id": "603f594c7ae138001c21fab7",
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
                  "id": "L6TI6478gXtITw2YN41jr",
                  "skill": {
                    "id": "603f594c7ae138001c21fab8",
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
                  "id": "MsOphBd3W_KQ4DdaakGPp",
                  "skill": {
                    "id": "603f594c7ae138001c21fab9",
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
                  "id": "THehdztiUSE3Cw5btn5Su",
                  "skill": {
                    "id": "603f594c7ae138001c21faba",
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
                  "id": "tlBrpgR4DdG1r773K1Q7t",
                  "skill": {
                    "id": "603f594c7ae138001c21fa6d",
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
                  "id": "56vR28eQrpbyJ9MvxJIeX",
                  "skill": {
                    "id": "603f594c7ae138001c21fa5b",
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
                  "id": "it00HnaOroQLJMQMZAcUt",
                  "skill": {
                    "id": "603f594c7ae138001c21fa5a",
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
                  "id": "NlpNx5m0aPlREJc8x-xTu",
                  "skill": {
                    "id": "603f594c7ae138001c21fa59",
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
                  "id": "JSge2h7HvRqb28Tz05Ysy",
                  "skill": {
                    "id": "603f594c7ae138001c21fa5d",
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
                  "id": "vj3hnZTXOA8mwBHnpnPDH",
                  "skill": {
                    "id": "603f594c7ae138001c21fa5c",
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
                  "id": "kSPXpAkgL7rbX6_EgNPPn",
                  "skill": {
                    "id": "603f594c7ae138001c21fa5f",
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
                  "id": "PLp2NM-1exGizuRg4dYWz",
                  "skill": {
                    "id": "603f594c7ae138001c21fa5e",
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
                  "id": "wia25y32kl",
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
                  "id": "SQDCNkfFqY23hqlg800yY",
                  "skill": {
                    "id": "603f59527ae138001c21fd56",
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
                  "id": "2dlczudd44c",
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
                  "id": "jrecz3d2p6d",
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
                  "id": "JlLyH8XLTMDSgJpIimuog",
                  "skill": {
                    "id": "603f594b7ae138001c21fa4f",
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
                  "id": "NFKTVSEH3vLj0JvDxPcY3",
                  "skill": {
                    "id": "603f594b7ae138001c21fa4e",
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
                  "id": "pamKlyUCXq2poG3J7wY9C",
                  "skill": {
                    "id": "603f594b7ae138001c21fa4d",
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
                  "id": "PTq8bPPfLrW8OqXhlhVh5",
                  "skill": {
                    "id": "603f594b7ae138001c21fa4c",
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
                  "id": "TpHR92ili5LivbFrznoch",
                  "skill": {
                    "id": "603f594c7ae138001c21fa53",
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
                  "id": "3XuD98MhnJwy2ka_---hJ",
                  "skill": {
                    "id": "603f594c7ae138001c21fa52",
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
                  "id": "KKgXhCnoPUYNLy5xkztZ0",
                  "skill": {
                    "id": "603f594b7ae138001c21fa51",
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
                  "id": "1b4eVHyJJxYGMDwJ-yURk",
                  "skill": {
                    "id": "603f594b7ae138001c21fa50",
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
                  "id": "HN3JA6PhMZERc2XD9GW5y",
                  "skill": {
                    "id": "603f594c7ae138001c21fa57",
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
                  "id": "feQk7jnBsMA3YADWkSAW4",
                  "skill": {
                    "id": "603f594c7ae138001c21fa56",
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
                  "id": "BnO77mokGwlvsocer9JNK",
                  "skill": {
                    "id": "603f594c7ae138001c21fa55",
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
                  "id": "89ySz_aQWei4DZfKfUqtv",
                  "skill": {
                    "id": "603f594c7ae138001c21fa54",
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
                  "id": "2hx0dkkYC3e19GmcIiK32",
                  "skill": {
                    "id": "603f59527ae138001c21fd52",
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
                  "id": "FuzzDW4u_m0QrgvTSCrv-",
                  "skill": {
                    "id": "603f59527ae138001c21fd53",
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
                  "id": "T8GV_9qUslFswCgK1J3Qe",
                  "skill": {
                    "id": "603f59527ae138001c21fd54",
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
                  "id": "AVSDdQ7kdnECG8JniOIy2",
                  "skill": {
                    "id": "603f59527ae138001c21fd55",
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
                  "id": "KWNub8arRW_deFQZ-LwiM",
                  "skill": {
                    "id": "603f59527ae138001c21fd57",
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
