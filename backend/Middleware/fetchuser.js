const jwt = require('jsonwebtoken')
const JWT_SECRET = "kdisbes@t";
const fetchuser = (req, res, next) => {
    //get user from jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const string = jwt.verify(token, JWT_SECRET)
        req.user = string.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
}



module.exports = fetchuser