// module.exports = {
//   apiKey: "AIzaSyBNZjX2z0LEfZMb8MLFJGLSQBSQLZIVnJY",
//   authDomain: "cookcycle-2e4a5.firebaseapp.com",
//   databaseURL: "https://cookcycle-2e4a5.firebaseio.com",
//   projectId: "cookcycle-2e4a5",
//   storageBucket: "cookcycle-2e4a5.appspot.com",
//   messagingSenderId: "693008551840",
//   appId: "1:693008551840:web:0a46d5356896ca12da1ec5",
// };

module.exports = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
