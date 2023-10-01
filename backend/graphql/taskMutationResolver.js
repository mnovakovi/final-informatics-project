const { createTask, deleteTask } = require('../db/data/tasks')
const uniqid = require('uniqid')
const { verifyToken, unauthorizedError } = require('../utils/auth')
const {taskByIdLoader, tasksByCourseLoader} = require('../dataLoaders/taskLoaders')

module.exports = {
    addTask: async (_root, args, context) => {
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
        const taskData = {
            id_task: uniqid(),
            ...args.input,
            date_created: new Date().toISOString()
        }
        const response = await createTask(taskData)
        tasksByCourseLoader.clear(response[0].id_course)
        taskByIdLoader.load(response[0].id_task)
        return await response[0]
    },

    removeTask: async (_root, args, context) => {
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
        const response = await deleteTask(args.id_task)
        tasksByCourseLoader.clear(args.id_course)
        taskByIdLoader.clear(args.id_task)
        return await response
    }
}