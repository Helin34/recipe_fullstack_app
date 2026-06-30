const express = require("express");
const {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
} = require("../controllers/recipeControllers");
const router = express.Router();

router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getRecipe).delete(deleteRecipe);

module.exports = router;
