import {
    getGuildInfo,
    getRelatedBookmarks,
} from "../../../support/getData";

describe('Check related bookmarks', () => {
    let guildInfo

    before(() => {
        cy.setToken('employee')
        cy.post(getGuildInfo()).then(res => guildInfo = res.body.data.guild)
    })

    it('every bookmarks has parent id', () => {
        const {skills} = guildInfo
        const skillsId = skills.map(el => el.id)

        cy.post(getRelatedBookmarks(skillsId[0])).then(req => {
           const {bookmarks} = req.body.data

           bookmarks.forEach(el => expect(el.skills
               .map(el => el.id).includes(skillsId[0])).equal(true))
        })
    })
})
