const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { response, request } = require("express");
require("dotenv").config();

//middlware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES
app.post("/recipes", async (request, response) => {
  try {
    const { name, describtion } = request.body;
    const newRecipe = await pool.query(
      "INSERT INTO recipes (name,describtion) VALUES($1,$2) RETURNING *",
      [name, describtion]
    );
    response.json(newRecipe);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/recipes", async (request, response) => {
  try {
    const allRecipes = await pool.query("SELECT * FROM recipes");
    response.json(allRecipes);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/recipes/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await pool.query("SELECT * FROM recipes WHERE rec_id = $1", [
      id,
    ]);
    response.json(recipe.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
