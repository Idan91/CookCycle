import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { app } from "../util/firebase";
import Axios from "../util/axios";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [firebaseIdToken, setFirebaseIdToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsSignedIn(!!user);
    });
  });

  const validateSignIn = () => {
    const loggedIn =
      currentUser ||
      localStorage.getItem("currentUser") ||
      localStorage.getItem("firebaseIdToken");

    return loggedIn !== null && loggedIn !== "null";
  };

  const facebookSignIn = () => {
    let facebookProvider = new firebase.auth.FacebookAuthProvider();
    app.auth().useDeviceLanguage();

    return signInWith(facebookProvider);
  };

  const googleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    return signInWith(googleProvider);
  };

  const signInWith = (provider) => {
    app
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = `Bearer ${result.credential.accessToken}`;
        setFirebaseIdToken(token);
        // The signed-in user info.
        var user = result.user;
        setCurrentUser(user);
        updateLocalStorageUserData(user, token);

        const userCredentials = {
          email: user.email,
          displayName: user.displayName,
          providerData: user.providerData,
        };

        Axios.post("/register-user", userCredentials)
          .then((response) => {
            // console.log(response);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        console.error(error);
        // var errorCode = error.code;
        var errorMessage = error.message;

        // The email of the user's account used.
        // var email = error.email;

        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        window.alert(errorMessage);
        // ...
      });
  };

  const signOut = () => {
    app
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        setFirebaseIdToken(null);
        setCurrentUser(null);
        updateLocalStorageUserData(null, null);
        window.alert("Sign out successful!");
      })
      .catch(function (error) {
        // An error happened.
        console.error(error);
      });
  };

  const updateLocalStorageUserData = (user, token) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("firebaseIdToken", token);
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        facebookSignIn,
        googleSignIn,
        currentUser,
        signOut,
        validateSignIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
