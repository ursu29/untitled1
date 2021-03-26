export const eventData = (title, end, start, skillsId = [], isExternal = true, isOnline = false) => ({
    city: 'Sankt-Peterburg',
    description: `20-23 апреля состоится HolyJS 2021 Piter — большая конференция для JavaScript-разработчиков. 
     На HolyJS JS-разработчики собираются вместе, чтобы обсудить новости стремительно развивающейся экосистемы.`,
    end: `${end}T20:00:05.809Z`,
    importance: 'NORMAL',
    isExternal,
    isOnline,
    link: 'https://holyjs-piter.ru/',
    location: "Невский проспект, 122",
    skills: skillsId,
    start: `${start}T07:00:05.809Z`,
    title,
})

export const eventsEl = {
    event: '.rbc-row-segment',
    count: 'count',
    user: 'user',
    signUp: 'signUp',
    modal: '.ant-modal-content'
}