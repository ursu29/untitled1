import {getProjectByCode, getProjectSkills, updateProjectSkills} from "../../support/getData";

describe('check updateProjectSkills', () => {
    let projectId
    let allSkillsId
    let skillsWithoutLast

    before(() => {
        cy.setToken('manager')
        cy.post(getProjectByCode()).then(req => {
            projectId = req.body.data.projectByCode.id

            cy.post(getProjectSkills(projectId)).then(req => {
                const {skills} = req.body.data.project

                allSkillsId = skills.map(el => el.id)
                skillsWithoutLast = skills.map(el => el.id).splice(0, allSkillsId.length - 1)
            })
        })
    })

    after(() => {
        cy.post(updateProjectSkills(projectId, allSkillsId))
    })

    it('delete one skill', () => {
        cy.post(updateProjectSkills(projectId, skillsWithoutLast)).then(req => {
            const {id} = req.body.data.updateProjectSkills

            expect(id.length).to.be.greaterThan(0)

            cy.post(getProjectSkills(projectId)).then(req => {
                const {skills} = req.body.data.project

                expect(allSkillsId.length).to.be.greaterThan(skills.length)
            })
        })
    })

    it('add one skill', () => {
        cy.post(updateProjectSkills(projectId, allSkillsId)).then(req => {
            const {id} = req.body.data.updateProjectSkills

            expect(id.length).to.be.greaterThan(0)

            cy.post(getProjectSkills(projectId)).then(req => {
                const {skills} = req.body.data.project

                expect(allSkillsId.length).equal(skills.length)
            })
        })
    })
})