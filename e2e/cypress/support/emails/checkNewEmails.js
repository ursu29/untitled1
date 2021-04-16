export const EMAIL_URL = 'https://graph.microsoft.com/v1.0/me/messages?$top=1000'

export const checkNewEmail = (allMessages, obj, URL = EMAIL_URL) => {
    cy.get(URL).then(el => {
        if(el.body.value.length > allMessages){
            const {bodyPreview} =  el.body.value[0]

            Object.values(obj).forEach(el => expect(bodyPreview).contain(el))
            return;
        }

        checkNewEmail(allMessages, obj, URL)
    })
}