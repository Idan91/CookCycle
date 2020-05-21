const { db } = require("../util/admin");

exports.getAllRecipes = (req, res) => {
  db.collection("recipes")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let recipes = [];
      data.forEach((doc) => {
        recipes.push({
          recipeId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(recipes);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.createRecipe = (req, res) => {
  const newRecipe = {
    title: req.body.title,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    instructions: req.body.instructions,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("recipes")
    .add(newRecipe)
    .then((doc) => {
      res.json({ message: `Recipe ${doc.id} created successfully!` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong!" });
      console.error(err);
    });
};
