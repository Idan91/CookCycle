// import * as firebase from "firebase/app";
// import "firebase/auth";

// export const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// export const app = firebase.initializeApp(firebaseConfig);

// export const authReducer = async (state, action) => {
//   switch (action.type) {
//     case "FACEBOOK_SIGNIN": {
//       let user = await facebookSignIn();
//       console.log(user);
//       return user;
//     }
//     case "GOOGLE_SIGNIN": {
//       return googleSignIn();
//     }
//     case "FACEBOOK_LOGOUT": {
//       break;
//     }
//     case "GOOGLE_LOGOUT": {
//       break;
//     }
//     default: {
//       return state;
//     }
//   }
// };

// const facebookSignIn = () => {
//   // let signedIn = false;

//   console.log("fb");

//   let facebookProvider = new firebase.auth.FacebookAuthProvider();
//   app.auth().useDeviceLanguage();

//   return signInWith(facebookProvider);

//   // return signedIn;
// };

// const googleSignIn = () => {
//   // let signedIn = false;

//   console.log("google");

//   var googleProvider = new firebase.auth.GoogleAuthProvider();

//   return signInWith(googleProvider);

//   // return signedIn;
// };

// const signInWith = (provider) => {
//   app
//     .auth()
//     // .signInWithRedirect(facebookProvider)
//     .signInWithPopup(provider)
//     .then((result) => {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       console.log(token);
//       // The signed-in user info.
//       var user = result.user;
//       console.log(user);
//       // TODO - Do something with token

//       return user;
//     })
//     .catch(function (error) {
//       // Handle Errors here.
//       console.error(error);
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
// };
