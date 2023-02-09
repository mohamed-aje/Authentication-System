const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/recipes", async (request, response) => {
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
router.get("/recipes", async (request, response) => {
  try {
    const allRecipes = await pool.query("SELECT * FROM recipes");
    response.json(allRecipes);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/recipes/:id", async (request, response) => {
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
router.put("/recipes/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { describtion } = request.body;
    const { name } = request.body;
    const updateRecipeName = await pool.query(
      "UPDATE recipes SET name = $1, describtion =$2  WHERE rec_id=$3 ",
      [name, describtion, id]
    );

    response.json("recipe was update");
  } catch (error) {
    console.error(error.message);
  }
});
router.delete("/recipes/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteRecipe = await pool.query(
      "DELETE FROM recipes WHERE rec_id=$1",
      [id]
    );
  } catch (error) {
    console.error(error.message);
  }
  response.json("recipe was deleted");
});

module.exports = router;
