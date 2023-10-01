const {connection} = require('../db/connection')
const DataLoader = require('dataloader')
const {LRUMap} = require('lru_map')

const lecturesByCourseLoader = new DataLoader(async (ids_course) => {
    const lectures = await connection
        .select()
        .from('tb_Lectures')
        .whereIn('tb_Lectures.id_course', ids_course)

    return ids_course.map((id_course) => lectures.filter((lecture) => lecture.id_course === id_course))
}, {
    cache: new LRUMap(15)
})

function createLecturesByCourseLoader() {
    return new DataLoader(async (ids_course) => {
        const lectures = await connection
            .select()
            .from('tb_Lectures')
            .whereIn('tb_Lectures.id_course', ids_course)

        return ids_course.map((id_course) => lectures.filter((lecture) => lecture.id_course === id_course))
    })
}

module.exports = {lecturesByCourseLoader, createLecturesByCourseLoader}