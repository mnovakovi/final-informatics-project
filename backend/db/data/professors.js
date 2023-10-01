const {connection} = require('../connection')
const DataLoader = require('dataloader')

const getProfessorByCourse = async (id_course) => {
    return await connection
        .select('tb_Professors.id_professor', 'tb_Professors.name', 'tb_Professors.surname', 'tb_Professors.username')
        .from('tb_Professors')
        .join('tb_Courses', 'tb_Professors.id_professor', 'tb_Courses.id_professor')
        .where('tb_Courses.id_course', id_course)
        .first();
}

const getProfessorByUsername = async (username) => {
    return await connection.table('tb_Professors').first().where({ username })
}

function createProfessorByCourseLoader() {
    return new DataLoader(async (ids_course) => {
        const professors = await connection
            .select('tb_Professors.id_professor', 'tb_Professors.name', 'tb_Professors.surname', 'tb_Professors.username', 'tb_Courses.id_course')
            .from('tb_Professors')
            .join('tb_Courses', 'tb_Professors.id_professor', 'tb_Courses.id_professor')
            .whereIn('tb_Courses.id_course', ids_course)

        return ids_course.map((id_course) => professors.find((professor) => professor.id_course === id_course))
    }, { cache: false})
}

module.exports = { getProfessorByCourse, getProfessorByUsername, createProfessorByCourseLoader }