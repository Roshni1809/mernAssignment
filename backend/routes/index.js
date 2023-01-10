var express = require('express')
var Routes = express.Router()
var userRouter = require('./userRoutes')
var productRouter = require('./productsRoute')


Routes.use("/users",userRouter )
Routes.use("/products", productRouter)


module.exports = Routes;

