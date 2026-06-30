const getData = require("../utils/getData");
const crypto = require("crypto");
const setData = require("../utils/setData");

const data = getData();

exports.getAllRecipes = (req, res) => {
  let recipes = [...data];

  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    recipes = recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search),
    );
  }

  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime,
    );
  }

  res.status(200).json({
    message: "Bütün tarifler başarıyla listelendi",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.getRecipe = (req, res) => {
  const found = data.find((i) => i.id === req.params.id);
  if (!found) return res.status(404).json({ message: "Tarif bulunamadı" });

  res.status(200).json({ message: "Tarif başarıyla bulundu", recipe: found });
};

exports.deleteRecipe = (req, res) => {
  const index = data.findIndex((i) => i.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Silinecek tarif bulunamadı" });

  data.splice(index, 1);
  setData(data);

  res.status(200).json({ message: "Tarif başarıyla silindi" });
};

exports.createRecipe = (req, res) => {
  const newRecipe = req.body;

  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res
      .status(400)
      .json({ message: "Lütfen tüm alanları eksiksiz doldurun" });
  }

  newRecipe.id = crypto.randomUUID();
  data.push(newRecipe);
  setData(data);

  // Başarılı oluşturma: 201 Created
  res.status(201).json({
    message: "Yeni tarif başarıyla oluşturuldu",
    newRecipe,
  });
};
