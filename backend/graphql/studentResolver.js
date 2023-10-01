const { generateToken, notFoundError } = require('../utils/auth')
const { getStudentByUsername, getStudentsByCourse, getStudentById } = require('../db/data/students')
const bcrypt = require('bcrypt')

module.exports = {
    studentLogin: async (_root, args) => {
        const findUser = await getStudentByUsername(args.input.username)
        if (findUser) {
            const chkPass = await bcrypt.compare(args.input.password, findUser.password)
            if (chkPass) {
                delete findUser.password
                const loginUser = {
                    ...findUser,
                    token: generateToken(findUser)
                }
                return loginUser
            }
            return notFoundError("Student with entered credentials does not exist!")
        }
        return notFoundError("Student with entered credentials does not exist!")
    },

    studentsByCourse: async (_root, args) => {
        const studentsByCourse = await getStudentsByCourse(args.id_course)
        return studentsByCourse
    },

    studentById: async (_root, args) => {
        const studentsById = await getStudentById(args.id_student)
        return studentsById
    }
}