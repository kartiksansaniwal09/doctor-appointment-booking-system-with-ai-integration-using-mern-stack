import jwt from 'jsonwebtoken'

const optionalAuthUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return next()
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        next()
    }
}

export default optionalAuthUser
