var { User } = require("../schema/index")
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var bcrypt = require("bcrypt")
require("dotenv").config()


userLogic = {
    Signup: async (body) => {
        return new Promise(async (resolve, reject) => {
            let email = body.email;
            let password = body.password;
            let name = body.name
            if (!password || password.length < 3 || password.length > 20) {
                reject({ status: 401, message: "Password Constraint Unsatisfied" })
            }
            try {
                let hashedpassword = await bcrypt.hash(password, 10);
                let user = new User({ name, email, password : hashedpassword });
                let data = await user.save();
                if (data) {
                    data = data.toObject();
                    delete data.password;
                    let token = await jwt.sign({ data }, process.env.PRIVATE_KEY, { expiresIn: '2h' })
                    token = "Bearer " + token 
                    resolve({ user: data, token })
                }
                else {
                    reject({ status: 400, message: "User Already Found" })
                }
            }
            catch {
                reject({ status: 500, message: "Internal Server Error" })
            }
        })

    },
    Login: async (body) => {
        return new Promise(async (resolve, reject) => {
            if (body.email && body.password) {
                try {
                    let user = await User.findOne({ email: body.email })
                    if (user) {
                        const isPasswordMatched = await bcrypt.compare(body.password, user.password);
                        if (!isPasswordMatched) {
                            reject({ status: 401, message: "Incorrect Password" })
                        }
                        user = user.toObject()
                        delete user.password
                        let token = jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: '2h' })
                        token = "Bearer " + token; 
                        resolve({ user: user, token })
                    }
                    else {
                        reject({ status: 401, message: "Email not found" })
                    }
                }
                catch {
                    reject({ status: 500, message: "Internal Server Error" })
                }
            }
            else {
                reject({ status: 400, message: "Bad Request" })
            }
        })
    }

}

module.exports = userLogic
