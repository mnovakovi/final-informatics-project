const {connection} = require('../db/connection')
const DataLoader = require('dataloader')
const {LRUMap} = require('lru_map')

const submissionByIdLoader = new DataLoader(async (ids_submission) => {
    const submissions = await connection
        .select('*')
        .from('tb_Submissions')
        .whereIn('tb_Submissions.id_submission', ids_submission)

    return ids_submission.map((id_submission) => submissions.find((submission) => submission.id_submission === id_submission))
}, {
    cache: new LRUMap(30)
})

function createSubmissionByIdLoader() {
    return new DataLoader(async (ids_submission) => {
        const submissions = await connection
            .select('*')
            .from('tb_Submissions')
            .whereIn('tb_Submissions.id_submission', ids_submission)

        return ids_submission.map((id_submission) => submissions.find((submission) => submission.id_submission === id_submission))
    })
}

module.exports = {submissionByIdLoader, createSubmissionByIdLoader}