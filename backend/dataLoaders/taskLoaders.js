const {connection} = require('../db/connection')
const DataLoader = require('dataloader')
const {LRUMap} = require('lru_map')

const tasksByCourseLoader = new DataLoader(async (ids_course) => {
    const tasks = await connection
        .select()
        .from('tb_Tasks')
        .whereIn('tb_Tasks.id_course', ids_course)

    return ids_course.map((id_course) => tasks.filter((task) => task.id_course === id_course))
}, {
    cache: new LRUMap(15)
})

function createTasksByCourseLoader() {
    return new DataLoader(async (ids_course) => {
        const tasks = await connection
            .select()
            .from('tb_Tasks')
            .whereIn('tb_Tasks.id_course', ids_course)

        return ids_course.map((id_course) => tasks.filter((task) => task.id_course === id_course))
    })
}

const taskByIdLoader = new DataLoader(async (ids_task) => {
    const tasks = await connection
        .select()
        .from('tb_Tasks')
        .whereIn('tb_Tasks.id_task', ids_task)

    return ids_task.map((id_task) => tasks.find((task) => task.id_task === id_task))
}, {
    cache: new LRUMap(15)
})

function createTaskByIdLoader() {
    return new DataLoader(async (ids_task) => {
        const tasks = await connection
            .select()
            .from('tb_Tasks')
            .whereIn('tb_Tasks.id_task', ids_task)

        return ids_task.map((id_task) => tasks.find((task) => task.id_task === id_task))
    })
}

module.exports = {taskByIdLoader, tasksByCourseLoader, createTaskByIdLoader, createTasksByCourseLoader}