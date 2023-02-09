const Pool = require("pg").Pool;
const pool = new Pool({
  user: "moha",
  password: "aje531008",
  host: "localhost",
  port: 5432,
  database: "recipes",
});
module.exports = pool;
