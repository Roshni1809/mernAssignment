var express = require('express')
var userRouter = express.Router()
const { userLogic } = require('../logics/index')


userRouter.post("/login", async(req, res) => {
    try {
        const result = await userLogic.Login(req.body);
        res.status(200).send(result)
    }
    catch (error) {
        res.status(error.status).send(error.message)
    }
})

userRouter.post("/signup", async(req, res) => {
    try {
        const result = await userLogic.Signup(req.body);
        res.status(200).send(result)
    }
    catch (error) {
        res.status(error.status).send(error.message)
    }
})

module.exports = userRouter