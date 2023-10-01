const {connection} = require('../connection')
const DataLoader = require('dataloader')

const getTaskById = async (id_task) => {
    return await connection
        .select()
        .from('tb_Tasks')
        .where('tb_Tasks.id_task', id_task)
        .first()
}

function createTaskByIdLoader() {
    return new DataLoader(async (ids_task) => {
        const tasks = await connection
            .select()
            .from('tb_Tasks')
            .whereIn('tb_Tasks.id_task', ids_task)

        return ids_task.map((id_task) => tasks.find((task) => task.id_task === id_task))
    })
}

const getTasksByCourse = async (id_course) => {
    return await connection
        .select()
        .from('tb_Tasks')
        .where('tb_Tasks.id_course', id_course)
}

function createTasksByCourseLoader() {
    return new DataLoader(async (ids_course) => {
        const tasks = await connection
            .select()
            .from('tb_Tasks')
            .whereIn('tb_Tasks.id_course', ids_course)

        return ids_course.map((id_course) => tasks.filter((task) => task.id_course === id_course))
    })
}

const getCourseTasksByStudent = async (id_student, id_course) => {
    return await connection
        .raw(
            `
        SELECT tb_Tasks.id_task, tb_Tasks.description, tb_Students.id_student, COALESCE(tb_Submissions.id_submission, 0) as id_submission
        FROM tb_Tasks
        LEFT JOIN tb_Submissions
        ON tb_Tasks.id_task = tb_Submissions.id_task AND tb_Submissions.id_student = ?
        LEFT JOIN tb_Enrollments
        ON tb_Tasks.id_course = tb_Enrollments.id_course AND tb_Enrollments.id_student = ?
        LEFT JOIN tb_Students
        ON tb_Enrollments.id_student = tb_Students.id_student
        WHERE tb_Tasks.id_course = ?
      `,
            [id_student, id_student, id_course]
        )
}

const createTask = async (task) => {
    return await connection('tb_Tasks')
        .insert(task)
        .returning('*')
}

const deleteTask = async (id_task) => {
    await connection('tb_Tasks')
        .where('tb_Tasks.id_task', id_task)
        .del()

    return (id_task)
}

module.exports = { getTasksByCourse, getCourseTasksByStudent, getTaskById, createTask, deleteTask, createTaskByIdLoader, createTasksByCourseLoader }