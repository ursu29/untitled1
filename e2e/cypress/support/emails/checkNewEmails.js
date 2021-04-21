export const EMAIL_URL = 'https://graph.microsoft.com/v1.0/me/messages?$top=1'

export const checkNewEmail = (emailData, obj, URL = EMAIL_URL) => {
    cy.wait(500)
    cy.getRequestData(URL).then(el => {
        const {bodyPreview} =  el.body.value[0]

        if(emailData !== bodyPreview) {
            Object.values(obj).forEach(el => expect(bodyPreview).contain(el))
            return;
        }
        checkNewEmail(emailData, obj, URL)
    })
}