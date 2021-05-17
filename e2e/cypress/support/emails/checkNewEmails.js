export const EMAIL_URL = 'https://graph.microsoft.com/v1.0/me/messages?$top=1'

export const checkNewEmail = (lastEmail, obj, isCompare, text = ' ', maxNumber = 10) => {
    let nextNumber = maxNumber - 1;

    // eslint-disable-next-line
    cy.wait(500)
    if(nextNumber) {
        cy.getRequestData(EMAIL_URL).then(el => {
            const {bodyPreview} =  el.body.value[0]
            const {content} = el.body.value[0].body
            const compareText = isCompare ? content : bodyPreview

            if(lastEmail !== bodyPreview && lastEmail.includes(text)) {
                Object.values(obj).forEach(el => expect(compareText).contain(el))
                return;
            }
            checkNewEmail(lastEmail, obj, isCompare, text, nextNumber)
        })
    }
}