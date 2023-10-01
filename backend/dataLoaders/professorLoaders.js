const {connection} = require('../db/connection')
const DataLoader = require('dataloader')
const { LRUMap } = require('lru_map')

const professorByCourseLoader = new DataLoader(async (ids_course) => {
    const professors = await connection
        .select('tb_Professors.id_professor', 'tb_Professors.name', 'tb_Professors.surname', 'tb_Professors.username', 'tb_Courses.id_course')
        .from('tb_Professors')
        .join('tb_Courses', 'tb_Professors.id_professor', 'tb_Courses.id_professor')
        .whereIn('tb_Courses.id_course', ids_course)

    return ids_course.map((id_course) => professors.find((professor) => professor.id_course === id_course))
}, {
    cache: new LRUMap(20)
})

function createProfessorByCourseLoader() {
    return new DataLoader(async (ids_course) => {
        const professors = await connection
            .select('tb_Professors.id_professor', 'tb_Professors.name', 'tb_Professors.surname', 'tb_Professors.username', 'tb_Courses.id_course')
            .from('tb_Professors')
            .join('tb_Courses', 'tb_Professors.id_professor', 'tb_Courses.id_professor')
            .whereIn('tb_Courses.id_course', ids_course)

        return ids_course.map((id_course) => professors.find((professor) => professor.id_course === id_course))
    }, { cache: false })
}

module.exports = { professorByCourseLoader, createProfessorByCourseLoader }