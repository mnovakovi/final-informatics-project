const { getCourseTasksByStudent, getTasksByCourse } = require('../db/data/tasks')
const { getTaskSubmissions } = require('../db/data/submissions')
const { verifyToken, unauthorizedError } = require('../utils/auth')

module.exports = {
    courseTasksByStudent: async (_root, args, context) => {
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
        const findTasks = await getCourseTasksByStudent(args.input.id_student, args.input.id_course)
        return findTasks
    },

    courseTasks: async (_root, args, context) => {
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
        const findTasks = await getTasksByCourse(args.id_course)
        return findTasks
    },

    taskSubmissions: async (_root, args, context, info) => {
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
        const taskSubmissions = await getTaskSubmissions(args.id_task)
        return taskSubmissions
    }
}