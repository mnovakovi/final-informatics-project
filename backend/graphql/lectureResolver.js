const { getLecturesByCourse, createLecture } = require('../db/data/lectures')
const { verifyToken, unauthorizedError } = require('../utils/auth')

module.exports = {
    courseLectures: async (_root, args, context) => {
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
        const findLectures = await (getLecturesByCourse(args.id_course))
        return findLectures
    }
}