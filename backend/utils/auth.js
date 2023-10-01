const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const secret = "graphQL"

const generateToken = async (user) => {
    return await jwt.sign(user, secret)
}

const verifyToken = async (token) => {
    return await jwt.verify(token, secret)
}

function unauthorizedError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'UNAUTHORIZED' },
    })
}

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' },
    })
}

module.exports = { generateToken, verifyToken, unauthorizedError, notFoundError }