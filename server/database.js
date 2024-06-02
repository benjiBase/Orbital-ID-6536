const Pool = require("pg").Pool

const pool = new Pool({
    user: "", //using own
    password: "", //using own
    host: "localhost",
    port: 5432,
    database: 'orbital'
});

module.exports = pool;