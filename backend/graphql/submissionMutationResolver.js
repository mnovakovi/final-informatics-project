const { createSubmission, updateSubmissionGrade } = require('../db/data/submissions')
const uniqid = require('uniqid')
const { verifyToken, unauthorizedError } = require('../utils/auth')
const {submissionByIdLoader} = require('../dataLoaders/submissionLoaders')

module.exports = {
    submitTask: async (_root, args, context) => {
        if (!context.authHeader) {
            throw unauthorizedError('Missing token!')
        }
        const token = context.authHeader.split(' ')[1]
        try {
            const validToken = await verifyToken(token)
        }
        catch (err) {
            throw unauthorizedError('Invalid token!')
        }
        const submissionData = {
            id_submission: uniqid(),
            ...args.input,
            date_submitted: new Date().toISOString()
        }
        const response = await createSubmission(submissionData)
        return await response[0]
    },

    gradeSubmission: async (_root, args, context) => {
        if (!context.authHeader) {
            throw unauthorizedError('Missing token!')
        }
        const token = context.authHeader.split(' ')[1]
        try {
            const validToken = await verifyToken(token)
            if (!validToken.id_professor)
                throw unauthorizedError('Professor authorization needed!')
        }
        catch (err) {
            throw unauthorizedError('Invalid token!')
        }
        const response = await updateSubmissionGrade(args.input.id_submission, args.input.grade)
        submissionByIdLoader.clear(args.input.id_submission)
        return response[0]
    }
}