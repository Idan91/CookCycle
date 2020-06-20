const { db } = require("../util/admin");

const config = require("../util/firebaseConfig");

const axios = require("axios");

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

exports.sendPasswordResetEmail = (request, response) => {
  const emailForgot = request.body.email;

  let { valid, errors } = validateForgotPassword(emailForgot);

  if (!valid) return response.status(400).json(errors);

  firebase
    .auth()
    .sendPasswordResetEmail(emailForgot)
    .then(() => {
      return response.json({
        resetPassword: `Reset password email sent to ${email}`,
      });
    })
    .catch((err) => {
      if (err.code === "auth/user-not-found") {
        errors.emailForgot =
          "There is no user record corresponding to this email";
        return response.status(400).json(errors);
      }
      console.log(err);
      return response.json({ general: "Password change failed" });
    });
};

exports.deleteAccount = (request, response) => {
  const user = firebase.auth().currentUser;
  const username = request.body.username;

  user
    .delete()
    .then(
      db
        .collection("users")
        .doc(`${username}`)
        .delete()
        .then(() => {
          return response.json({
            deleteAccountData: `${username}'s data has been deleted successfully`,
          });
        })
    )
    .then(() => {
      return response.json({
        deleteAccount: `The user ${username} has been deleted successfully`,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.updatePassword = (request, response) => {
  const user = firebase.auth().currentUser;
  const updateRequest = {
    email: request.body.email,
    currentPassword: request.body.currentPassword,
    newPassword: request.body.newPassword,
    confirmNewPassword: request.body.confirmNewPassword,
  };

  let { valid, errors } = validateUpdatePassword(updateRequest);

  if (!valid) return response.status(400).json(errors);

  const credential = firebase.auth.EmailAuthProvider.credential(
    updateRequest.email,
    updateRequest.currentPassword
  );

  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      if (updateRequest.newPassword === updateRequest.currentPassword) {
        errors.newPassword =
          "New password is the same as the current one. Please pick a new password";
        return response.status(400).json(errors);
      } else {
        user
          .updatePassword(updateRequest.newPassword)
          .then(() => {
            {
              let updateSuccessfullMsg = "Password updated successfully";
              return response.json({
                updatePassword: updateSuccessfullMsg,
              });
            }
          })
          .catch((err) => {
            if (err.code === "auth/wrong-password") {
              errors.currentPassword = err.message;
              return response.status(400).json(errors);
            }
            console.log(err);
            return response.json({ general: "Password change failed" });
          });
      }
    })
    .catch((err) => {
      errors.currentPassword = "Current password is incorrect";
      console.log(err);
      return response.status(400).json(errors);
    });
};
