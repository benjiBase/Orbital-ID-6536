const router = require("express").Router();
const poolDB = require("../database");
const authorization = require("../joint/authorization");

router.get("/", authorization, async (request, resp) => {
    try {
        const user = await poolDB.query("SELECT user_name FROM users WHERE user_id = $1", [request.user.id]);
        resp.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        resp.status(500).send("Server Error");
    }
})

module.exports = router;