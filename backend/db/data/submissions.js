const {connection} = require('../connection')
const DataLoader = require('dataloader')

const getSubmissionById = async (id_submission) => {
    return await connection
        .select()
        .from('tb_Submissions')
        .where('tb_Submissions.id_submission', id_submission)
        .first()
}

function createSubmissionByIdLoader() {
    return new DataLoader(async (ids_submission) => {
        const submissions = await connection
            .select('*')
            .from('tb_Submissions')
            .whereIn('tb_Submissions.id_submission', ids_submission)

        return ids_submission.map((id_submission) => submissions.find((submission) => submission.id_submission === id_submission))
    })
}

const createSubmission = async (submission) => {
    return await connection('tb_Submissions')
        .insert(submission)
        .returning('*')
}

const getTaskSubmissions = async (id_task) => {
    return await connection('tb_Students')
        .select(
            'tb_Students.id_student',
            'tb_Tasks.id_task',
            'tb_Tasks.description',
            connection.raw('COALESCE(tb_Submissions.id_submission, 0) as id_submission')
        )
        .leftJoin('tb_Enrollments', 'tb_Students.id_student', 'tb_Enrollments.id_student')
        .leftJoin('tb_Tasks', 'tb_Tasks.id_course', 'tb_Enrollments.id_course')
        .leftJoin('tb_Submissions', function () {
            this.on('tb_Tasks.id_task', '=', 'tb_Submissions.id_task').andOn('tb_Submissions.id_student', '=', 'tb_Students.id_student');
        })
        .where('tb_Tasks.id_task', id_task)
        .orderBy('tb_Students.surname');
}

const updateSubmissionGrade = async (id_submission, grade) => {
    return await connection('tb_Submissions')
        .where({ id_submission })
        .update({ grade })
        .returning('*')
}

module.exports = { getSubmissionById, createSubmission, getTaskSubmissions, updateSubmissionGrade, createSubmissionByIdLoader }