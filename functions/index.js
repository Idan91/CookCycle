const functions = require("firebase-functions");
const app = require("express")();

const cors = require("cors");
app.use(cors());

const firebaseAuth = require("./util/firebaseAuth");

const {
  // signup,
  // login,
  registerUserCredentials,
  getUserData,
  updateRecipes,
} = require("./handlers/users");

const { getAllRecipes } = require("./handlers/recipes");

// app.post("/signup", signup);
// app.post("/login", login);
app.post("/register-user", registerUserCredentials);
app.post("/user/data", getUserData);
app.post("/user/update-recipes", updateRecipes);
app.get("/recipes", getAllRecipes);
// app.get("/user", firebaseAuth, getAuthenticatedUser);
// app.post("/user/data", firebaseAuth, getUserData);

exports.api = functions.region("europe-west3").https.onRequest(app);
