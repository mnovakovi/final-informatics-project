const { getSubmissionById } = require('../db/data/submissions')
const { verifyToken, unauthorizedError } = require('../utils/auth')

module.exports = {
    submissionById: async (_root, args, context) => {
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
        const findSubmission = await getSubmissionById(args.id_submission)
        return findSubmission
    }
}