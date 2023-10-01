const { generateToken, notFoundError } = require('../utils/auth')
const { getProfessorByUsername } = require('../db/data/professors')
const bcrypt = require('bcrypt')

module.exports = {
    professorLogin: async (_root, args) => {
        const findUser = await getProfessorByUsername(args.input.username)
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
            return notFoundError("Professor with entered credentials does not exist!")
        }
        return notFoundError("Professor with entered credentials does not exist!")
    }
}