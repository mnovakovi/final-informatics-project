const {connection} = require('../connection')

const getLecturesByCourse = async (id_course) => {
    return await connection
        .select()
        .from('tb_Lectures')
        .where('tb_Lectures.id_course', id_course)
}

const createLecture = async (lecture) => {
    return await connection('tb_Lectures')
        .insert(lecture)
        .returning('*')
}

const deleteLecture = async (id_lecture) => {
    await connection('tb_Lectures')
        .where('tb_Lectures.id_lecture', id_lecture)
        .del()

    return (id_lecture)
}

module.exports = { getLecturesByCourse, createLecture, deleteLecture }