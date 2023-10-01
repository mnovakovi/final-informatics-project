const {connection} = require('../db/connection')
const DataLoader = require('dataloader')
const {LRUMap} = require('lru_map')

const studentsByCourseLoader = new DataLoader(async (ids_course) => {
    const students = await connection
        .select('tb_Students.id_student', 'tb_Students.name', 'tb_Students.surname', 'tb_Students.username', 'tb_Enrollments.id_course')
        .from('tb_Students')
        .join('tb_Enrollments', 'tb_Students.id_student', 'tb_Enrollments.id_student')
        .whereIn('tb_Enrollments.id_course', ids_course)
        .orderBy('tb_Students.surname')

    return ids_course.map((id_course) => students.filter((student) => student.id_course === id_course))
},{
    cache: new LRUMap(30)
})

function createStudentsByCourseLoader() {
    return new DataLoader(async (ids_course) => {
        const students = await connection
            .select('tb_Students.id_student', 'tb_Students.name', 'tb_Students.surname', 'tb_Students.username', 'tb_Enrollments.id_course')
            .from('tb_Students')
            .join('tb_Enrollments', 'tb_Students.id_student', 'tb_Enrollments.id_student')
            .whereIn('tb_Enrollments.id_course', ids_course)
            .orderBy('tb_Students.surname')

        return ids_course.map((id_course) => students.filter((student) => student.id_course === id_course))
    })
}

const studentByIdLoader = new DataLoader(async (ids_student) => {
    const students = await connection
        .select('*')
        .from('tb_Students')
        .whereIn('tb_Students.id_student', ids_student)

    return ids_student.map((id_student) => students.find((student) => student.id_student === id_student))
}, {
    cache: new LRUMap(30)
})

function createStudentByIdLoader() {
    return new DataLoader(async (ids_student) => {
        const students = await connection
            .select('*')
            .from('tb_Students')
            .whereIn('tb_Students.id_student', ids_student)

        return ids_student.map((id_student) => students.find((student) => student.id_student === id_student))
    })
}

module.exports = {studentByIdLoader, studentsByCourseLoader, createStudentByIdLoader, createStudentsByCourseLoader}