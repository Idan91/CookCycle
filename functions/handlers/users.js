const { db } = require("../util/admin");

const config = require("../util/firebaseConfig");

const firebase = require("firebase");
firebase.initializeApp(config);

exports.signup = (req, res) => {
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
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // Todo - validators

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
};

exports.registerUserCredentials = (req, res) => {
  const userCredentials = {
    email: req.body.email,
    displayName: req.body.displayName,
    providerData: req.body.providerData,
    recipes: [],
    createdAt: new Date().toISOString(),
  };

  try {
    db.doc(`/users/${userCredentials.email}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          db.doc(`/users/${userCredentials.email}`).set(userCredentials);
          return res.status(201).json({ message: "Registered user in db" });
        }
      });
  } catch (err) {
    console.error(err);
    return res
      .status(403)
      .json({ general: "Wrong credentials, please try again" });
  }
};

exports.getUserData = (req, res) => {
  const email = req.body.email;

  db.doc(`/users/${email}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res
          .status(400)
          .json({ data: `Could not retrieve ${email}'s data` });
      } else {
        return doc;
      }
    })
    .then((data) => {
      return res.json(data._fieldsProto);
    })
    .catch((err) => console.error(err));
};

exports.updateRecipes = (req, res) => {
  let updateReqeust = {
    email: req.body.email,
    recipes: req.body.recipes,
    updatedAt: new Date().toISOString(),
  };

  db.doc(`/users/${updateReqeust.email}`)
    .update(updateReqeust)
    .then(() => {
      return response.json({
        message: `${updateReqeust.email}'s recipes updated successfully!`,
      });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

// exports.getAuthenticatedUser = (req, res) => {
//   const user = firebase.auth().currentUser;
//   let userData = {};

//   db.doc(`/users/${req.user.username}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         userData.credentials = doc.data();
//         if (user.emailVerified) {
//           userData.credentials.emailVerified = true;
//         }
//       }
//     })
//     .then(() => {
//       return res.json(userData);
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
