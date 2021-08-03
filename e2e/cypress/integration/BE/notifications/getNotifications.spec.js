import {getAllBirthdays, getNotifications} from "../../../support/getData";
import {getDayAndMonth} from "../../../support/officePlanner/officeDays";

describe('get notification data', () => {
    const allData = []
    const allDates = [getDayAndMonth(0), getDayAndMonth(1), getDayAndMonth(2)]

    before(() => {
        cy.setToken('employee')
        cy.post(getAllBirthdays()).then(req =>
            req.body.data.employees.map(el => allDates.toString().includes(el.birthday) ? allData.push(el) : null))
    })

    it('get all notifications', () => {
        cy.post(getNotifications()).then(res => {
            const count = res.body.data.notifications.filter(el => el.link.includes('employees'))

            expect(allData.length).equal(count.length)
        })
    })
})