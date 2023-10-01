const {connection} = require('../db/connection')
const DataLoader = require('dataloader')
const {LRUMap} = require('lru_map')

const coursesByProfessorLoader = new DataLoader(async (ids_professor) => {
    const courses = await connection
        .select('tb_Courses.id_course', 'tb_Courses.title', 'tb_Professors.id_professor')
        .from('tb_Courses')
        .join('tb_Professors', 'tb_Courses.id_professor', 'tb_Professors.id_professor')
        .whereIn('tb_Professors.id_professor', ids_professor);

    return ids_professor.map((id_professor) => courses.filter((course) => course.id_professor === id_professor))
}, {
    cache: new LRUMap(20)
})

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

const courseByIdLoader = new DataLoader(async (ids_course) => {
    const courses = await connection
        .select()
        .from('tb_Courses')
        .whereIn('tb_Courses.id_course', ids_course)

    return ids_course.map((id_course) => courses.find((course) => course.id_course === id_course))
}, {
    cache: new LRUMap(20)
})

function createCourseByIdLoader() {
    return new DataLoader(async (ids_course) => {
        const courses = await connection
            .select()
            .from('tb_Courses')
            .whereIn('tb_Courses.id_course', ids_course)

        return ids_course.map((id_course) => courses.find((course) => course.id_course === id_course))
    })
}

module.exports = {courseByIdLoader, coursesByProfessorLoader, createCourseByIdLoader, createCoursesByProfessorLoader}