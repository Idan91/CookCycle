const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const app = require("express")();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNZjX2z0LEfZMb8MLFJGLSQBSQLZIVnJY",
  authDomain: "cookcycle-2e4a5.firebaseapp.com",
  databaseURL: "https://cookcycle-2e4a5.firebaseio.com",
  projectId: "cookcycle-2e4a5",
  storageBucket: "cookcycle-2e4a5.appspot.com",
  messagingSenderId: "693008551840",
  appId: "1:693008551840:web:0a46d5356896ca12da1ec5",
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get("/recipes", (req, res) => {
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
});

app.post("/recipe", (req, res) => {
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
});

// Signup route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };

  // TODO - Validate data

  let token, userId;

  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ username: "Username already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ error: "Email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

const facebookProvider = new firebase.auth.FacebookAuthProvider();
firebase.auth().useDeviceLanguage();

facebookProvider.setCustomParameters({
  display: "popup",
});

exports.api = functions.region("europe-west3").https.onRequest(app);
