import firebase from "firebase";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5bgWZYWzKuQO4Qp697gQZm93SYWGrZJk",
    authDomain: "projectsgomycode.firebaseapp.com",
    projectId: "projectsgomycode",
    storageBucket: "projectsgomycode.appspot.com",
    messagingSenderId: "699739134353",
    appId: "1:699739134353:web:d9ca1e25d27104eb24e230"
};
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;