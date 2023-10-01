const {connection} = require('../connection')
const DataLoader = require('dataloader')

const getCourseById = async (id_course) => {
    return await connection
        .select()
        .from('tb_Courses')
        .where('tb_Courses.id_course', id_course)
        .first()
}

function createCourseByIdLoader() {
    return new DataLoader(async (ids_course) => {
        const courses = await connection
            .select()
            .from('tb_Courses')
            .whereIn('tb_Courses.id_course', ids_course)

        return ids_course.map((id_course) => courses.find((course) => course.id_course === id_course))
    })
}

const getCoursesByStudent = async (id_student) => {
    return await connection
        .select('tb_Courses.id_course', 'tb_Courses.title')
        .from('tb_Courses')
        .join('tb_Enrollments', 'tb_Courses.id_course', 'tb_Enrollments.id_course')
        .where('tb_Enrollments.id_student', id_student);
}

const getCoursesByProfessor = async (id_professor) => {
    return await connection
        .select('tb_Courses.id_course', 'tb_Courses.title')
        .from('tb_Courses')
        .join('tb_Professors', 'tb_Courses.id_professor', 'tb_Professors.id_professor')
        .where('tb_Professors.id_professor', id_professor);
}

function createCoursesByProfessorLoader() {
    return new DataLoader(async (ids_professor) => {
        const courses = await connection
            .select('tb_Courses.id_course', 'tb_Courses.title', 'tb_Professors.id_professor')
            .from('tb_Courses')
            .join('tb_Professors', 'tb_Courses.id_professor', 'tb_Professors.id_professor')
            .whereIn('tb_Professors.id_professor', ids_professor);

        return ids_professor.map((id_professor) => courses.filter((course) => course.id_professor === id_professor))
    })
}

const getCourseByTask = async (id_task) => {
    return await connection
        .select()
        .from('tb_Courses')
        .join('tb_Tasks', 'tb_Courses.id_course', 'tb_Tasks.id_course')
        .where('tb_Tasks.id_task', id_task)
        .first()
}

module.exports = { getCoursesByStudent, getCoursesByProfessor, getCourseByTask, getCourseById, createCourseByIdLoader, createCoursesByProfessorLoader }