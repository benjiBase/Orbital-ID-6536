const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (request, resp, next) => {
    try {
        const jwtToken = request.header("token");

        // Check JWT token
        if(!jwtToken) {
            return resp.status(403).json("Not authorized");
        }

        // Verify method to check if its real
        const payload = jwt.verify(jwtToken, process.env.jwtSecretKey);
        request.user = payload.user;
        next();

    } catch (err) {
        console.error(err.message);
        return resp.status(403).json("Not authorized");
    }
}