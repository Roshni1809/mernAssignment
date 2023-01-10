const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
require("dotenv").config()

const dbConnect = mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("db Connected")
    }
}
)

module.exports = dbConnect;