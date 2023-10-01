const { getCoursesByStudent, getCourseById, getCoursesByProfessor } = require('../db/data/courses')
const { verifyToken, unauthorizedError } = require('../utils/auth')

module.exports = {
    coursesByStudent: async (_root, args, context) => {
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
        const findCourses = await getCoursesByStudent(args.id_student)
        return findCourses
    },

    coursesByProfessor: async (_root, args, context) => {
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
        const findCourses = await getCoursesByProfessor(args.id_professor)
        return findCourses
    },

    courseById: async (_root, args) => {
        const findCourse = await getCourseById(args.id_course)
        return findCourse
    }
}