import {getAllBirthdays, getNotifications} from "../../../support/getData";
import {getDayAndMonth} from "../../../support/officePlanner/officeDays";

describe('get notification data', () => {
    const allData = []
    const allDates = [getDayAndMonth(0), '1.05', getDayAndMonth(2)]
    console.log(allDates)

    before(() => {
        cy.setToken('employee')
        cy.post(getNotifications()).as('notification')
        cy.post(getAllBirthdays()).then(req => {
            req.body.data.employees.map(el => allDates.includes(el.birthday) ? allData.push(el.birthday) : null)
        })
    })

    it('successfully get notification data', () => {
        cy.get('@notification').should(({data}) => {
            expect(allData.length).equal(res.body.data.notifications.length)
        })
    })
})