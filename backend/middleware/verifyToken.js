const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    if(req.originalUrl.split("/")[1] == "users") {
        next();
        return;
    }
    let authToken = req.headers['authorization'];
    authToken = authToken?.split(" ")[1]
    if (authToken) 
    {
        try {
            const verify = await jwt.verify(authToken , process.env.PRIVATE_KEY)
            next();
        }   
        catch {
            res.status(401).send("Unauthorized User") 
            }
    }
    else {
        res.status(400).send("Bad Request")     
    }
}

module.exports = verifyToken;