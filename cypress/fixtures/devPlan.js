export const getDevPlans = () => ({
  "data": {
    "developmentPlans": [
      {
        "id": "600944f1f0450c001c772da1",
        "createdAt": "2021-01-21T09:10:09.737Z",
        "updatedAt": "2021-02-02T11:52:18.824Z",
        "developmentRoles": {
          "webDeveloper": true,
          "actuarialBusinessAnalyst": true,
          "agileCoach": null,
          "automationQA": false,
          "devOps": null,
          "infrastructureArchitect": null,
          "javaDeveloper": null,
          "dotnetDeveloper": null,
          "manualQA": null,
          "mathematician": false,
          "scrumMaster": true,
          "solutionArchitect": false,
          "teamLead": null,
          "uxExpert": null,
          "productOwner": null,
          "dataAnalyst": null,
          "__typename": "DevelopmentRoles"
        },
        "guildContribution": {
          "internalProject": null,
          "education": null,
          "noContribution": true,
          "startup": null,
          "custom": "test",
          "__typename": "GuildContribution"
        },
        "previousGoals": [
          {
            "id": "600ab625a8239b001ce8be57",
            "description": "goal1",
            "successCriteria": "+++",
            "isAchieved": true,
            "comment": "comment",
            "__typename": "DevelopmentGoal"
          }
        ],
        "actualGoals": [
          {
            "id": "600ab625a8239b001ce8be59",
            "description": "goal2",
            "successCriteria": "++++",
            "isAchieved": null,
            "comment": "plus",
            "__typename": "DevelopmentGoal"
          }
        ],
        "amountOfTime": "Define here a rough plan how you will use guild for a half of a year or for a full year. i.e. I will need 1 day per week to do guild work",
        "longTermGoals": "Capture what long term goals the employee has in this regards. As an example “I want to become Senior Property Insurance Business Analyst in 2 years” would look fine in this section, but format is not strict\n",
        "lookBackNegative": "-",
        "lookBackPositive": "positive",
        "lookForward": "Capture interest in the project and how ",
        "lastDiscussed": "2021-02-03",
        "__typename": "DevelopmentPlan"
      }
    ]
  }
})
