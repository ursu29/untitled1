export const codeOkAndBodyNotNull = (response) => {
    expect(response).property("status").to.equal(200);
    expect(response.body).to.not.be.oneOf([null, ""]);
};

export const codeOkAndBodyEqualsExpected = (response, expectedBody) => {
    codeOkAndBodyNotNull(response);
    expect(response.body).to.deep.equal(expectedBody);
};
