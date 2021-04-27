describe('Check statistic page', () => {
    const skillName = 'Git'
    let gitData

    before(() => {
        cy.setToken('employee')
        cy.visit('/skills')

        cy.getResponse(['getSkillExperiences'], 'alias')
        cy.get('a[href*="/stats"]').click()
        cy.wait(`@alias`).then(val => {
            const {skills} = val.response.body.data
             gitData = skills.filter(el => el.name === skillName)
        })
    })

    it(`check number of employees who knows ${skillName}`, () => {
        const {experiences} = gitData[0]

        cy.get('tspan').contains(experiences.length)
            .then(el => expect(el.text()).equal(experiences.length.toString()))
    })
})