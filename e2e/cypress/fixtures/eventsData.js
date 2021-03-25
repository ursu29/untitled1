import {generateObjects} from "../support/utils";

const getEmployee = {
    employee: {
        id: "603f59277ae138001c21f5d6",
        name: "Alexander Vygodchikov",
        email: "a.vygodchikov@syncretis.com",
        position: "Frontend Developer",
        __typename: "Employee"
    },
    status: "tentativelyAccepted",
    __typename: "EventAttendee"
}

export const bookPeople = (count = 6) => ({
    data: {
        "event": {
            "id": "6059feef8683bb001c31c98d",
            "title": "test",
            "description": null,
            "link": null,
            "start": "2021-03-22T14:44:54.570Z",
            "end": "2021-03-22T14:44:54.570Z",
            "importance": "NORMAL",
            "isOnline": true,
            "isExternal": false,
            "city": null,
            "location": null,
            "skills": [],
            "attendees": [
                ...generateObjects(count, getEmployee),
            ],
            "createdBy": {
                "id": "603f59277ae138001c21f5d6",
                "__typename": "Employee"
            },
            "__typename": "Event"
        }
    }
})