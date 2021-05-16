const Users = require("../users-model.js")
const bcrypt = require("bcryptjs")

//Checks if the new username is unique or not
const checkIfUnique = async (req, res, next) => {
    try {
        const username = req.body.username
        const user = await Users.findByUserName(username).first()
        if (user) {
            return res.status(400).json({
                message: "username taken",
            })
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}

//Checks if the username and password is provided while logging in and registering
const checkPayload = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: "username and password required",
        })
    } else {
        next()
    }
}

//Checks if the user already exists in the database or not upon login
const checkUsernameExists = async (req, res, next) => {
    try {
        const username = req.body.username
        const user = await Users.findByUserName(username).first()

        if (!user) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }

        const passwordValid = await bcrypt.compare(req.body.password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }

        req.user = user
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkUsernameExists,
    checkPayload,
    checkIfUnique,
}