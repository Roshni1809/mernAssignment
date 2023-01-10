const express= require('express');
const routes = require('./routes/index')
var app= express();
const Router = express.Router()
app.use(Router)
const jwt = require('jsonwebtoken');
require("dotenv").config()
const {verifyToken} = require("./middleware/index")
const cors = require("cors")


Router.use('/',express.json(),cors(),verifyToken, routes)

app.listen(process.env.PORT, console.log("Server Started"))