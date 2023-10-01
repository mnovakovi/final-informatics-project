const { createLecture, deleteLecture } = require('../db/data/lectures')
const uniqid = require('uniqid')
const { verifyToken, unauthorizedError } = require('../utils/auth')
const { lecturesByCourseLoader } = require('../dataLoaders/lectureLoaders')

module.exports = {
    addLecture: async (_root, args, context) => {
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
        const lectureData = {
            id_lecture: uniqid(),
            ...args.input,
            date_created: new Date().toISOString()
        }
        const response = await createLecture(lectureData)
        lecturesByCourseLoader.clear(response[0].id_course)
        return await response[0]
    },

    removeLecture: async (_root, args, context) => {
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
        const response = await deleteLecture(args.id_lecture)
        lecturesByCourseLoader.clear(args.id_course)
        return await response
    }
}