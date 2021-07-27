import {EMAIL_URL} from "./checkNewEmails";

export const allData = (
    employeeData,
    vacancyData,
    toHrMessage = true) => ({
    email: employeeData.email,
    name: employeeData.name,
    ...vacancyData,
    toHrMessage
})

export const employeeMessage = (email, name, projectName) => ({
    recipient: email,
    name: `Dear ${name}, your application was approved`,
    projectName,
})

export const hrMessage = (reason, name, vacancyName) => ({
    reason,
    recipient: 'HR@syncretis.com',
    body: `Candidate ${name} wants to apply for vacancy ${vacancyName}`,
})


export const checkRotationEmail = (emailData, maxNumber = 10) => {
    const {name, email, firstVacancy, reasonText, toHrMessage} = emailData
    let nextNumber = maxNumber - 1;

    if(nextNumber) {
        // eslint-disable-next-line
        cy.wait(500)
        cy.getRequestData(EMAIL_URL).then(el => {
            const { bodyPreview } = el.body.value[0]
            const emailBody = toHrMessage ? hrMessage(reasonText, name, firstVacancy.position) :
              employeeMessage(email, name, firstVacancy.project.name)
            const check = () => toHrMessage ? bodyPreview.includes(reasonText) :
              emailData !== bodyPreview && bodyPreview.includes(email)

            if (check()) {
                Object.values(emailBody).forEach(el => expect(bodyPreview).contain(el))
                return;
            }

            checkRotationEmail(emailData, nextNumber)
        })
    } else {
    expect(true).equal(false)
    cy.log('No get any messages')
    }
}