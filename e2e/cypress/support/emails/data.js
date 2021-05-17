import {mainCity} from "../locators";

export const createProcessObj = (project, process, locations = [mainCity], prio = 1) => ({
    project,
    process,
    prio,
    locations
})

export const bodyData = {
    type: 'ONBOARDING',
    customer: 'INTERNAL',
    title: 'onboarding autotest title'
}

export const stepName = `test step: ${new Date().toLocaleTimeString()}`

export const bodyObj = (id, responsibleUsers, sendToTeamlead = false) => ({
    title:  stepName,
    responsibleUsers,
    hasComment: false,
    sendToTeamlead,
    send24hoursNotification: false,
    isAgileResponsible: false,
    id,
    type: 'APPROVE',
    description: 'description'
})

export const offBoardingObj = (vacancyId, employeeId) => ({
    employeePhone: '09349934934',
    employeeRef: employeeId,
    finishDate: '2021-04-14T13:42:16.592Z',
    id: vacancyId,

})

export const vacancyObj = (id, project) => ({
    additionalSkills: null,
    description: "Внешнее описание",
    employeeExperience: "С опытом работы 1-3 года",
    englishLevel: "Elementary",
    id,
    locations: ["SAINT_PETERSBURG"],
    position: "new position",
    project,
    reason: null,
    requiredSkills: "Что мы ждём от кандидатов",
    responsibilities: "Чем предстоит заниматься",
    stack: null
})

export const stepMessage = (emails, name, title) => ({
    recipients: emails,
    name: `The step "${name}" for process "${title}" is active`,
})

