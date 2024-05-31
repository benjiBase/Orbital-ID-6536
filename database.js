const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "Cljw324890!",
    host: "localhost",
    port: 5432,
    database: 'orbital'
});

module.exports = pool;