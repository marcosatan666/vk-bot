const app = require("firebase/app");

const firebase = app.initializeApp({
    apiKey: "AIzaSyB0ovCjn7Cs9L_i18pc0uu89whjhkrQEY4",
    authDomain: "messenger-for-girls.firebaseapp.com",
    databaseURL: "https://messenger-for-girls.firebaseio.com",
    projectId: "messenger-for-girls",
    storageBucket: "messenger-for-girls.appspot.com",
    messagingSenderId: "440481302135",
    appId: "1:440481302135:web:14655bf39e17691a9f6872",
    measurementId: "G-C0J24TJY90"
})

export default firebase;
