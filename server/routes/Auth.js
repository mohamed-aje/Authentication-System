const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/register", async (request, response) => {
  const { email, name, password } = request.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return response.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    console.log(jwtToken);
    return response.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    response.status(500).send("Server error");
  }
});
//login route
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 ",
      [email]
    );
    //check if user exist
    if (user.rows.length === 0) {
      return response.status(401).json("Password or Email is incorrect.");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return response.status(401).json("Paswword or Email is incorrect.");
    }
    const token = jwtGenerator(user.rows[0].user_id);
    response.json({ token });
  } catch (error) {
    console.error(error.message);
  }
});
module.exports = router;
