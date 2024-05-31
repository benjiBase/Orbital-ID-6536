const router = require("express").Router();
const poolDB = require("../database");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validCredentials = require("../joint/validCred");
const authorization = require("../joint/authorization");

// Registering 
// 401 is unauthenticated and 403 is unauthorized
// await is needed because of async and the time needed to process
router.post("/register", validCredentials, async (request, resp) => {
    try {
        const {name, email, password} = request.body;
        
        // Extract the email
        const user = await poolDB.query("SELECT * FROM users WHERE user_email = $1", [email]);

        // Checks if user exists, using the email
        if (user.rows.length !== 0) {
            return resp.status(401).send("User already exists!");
        }

        // Bcrypt password (look at bcrypt documentation)
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Add user into database
        const newUser = await poolDB.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );
        
        // JWT Token
        const token = jwtGenerator(newUser.rows[0].user_id);
        resp.json({token});

    } catch (err) {
        console.error(err.message);
        resp.status(500).send("Server Error");
    }
});

// Login
// 401 is unauthenticated and 403 is unauthorized
// await is needed because of async and the time needed to process
router.post("/login", validCredentials, async (request, resp) => {
    try {
        const {email, password} = request.body;

        // Extract user email
        const user = await poolDB.query("SELECT * FROM users WHERE user_email = $1", [email]);

        // Check if user does not exist
        if (user.rows.length === 0) {
            return resp.status(401).json("Email or password is incorrect");
        }

        // Password checking
        const correctPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!correctPassword) {
            return resp.status(401).json("Email or password is incorrect");
        }

        // JWT token
        const token = jwtGenerator(user.rows[0].user_id);
        resp.json({token});

    } catch (err) {
        console.error(err.message);
        resp.status(500).send("Server Error");
    }
});

// Verification
router.get("/is-verify", authorization, async (request, resp) => {
    try {
        resp.json(true);
    } catch (err) {
        console.error(err.message);
        resp.status(500).send("Server Error");
    }
});

module.exports = router;