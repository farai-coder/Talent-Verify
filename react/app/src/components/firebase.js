// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQrRKp5YvrxQyHpMLlu3jYiqfpabQscZQ",
  authDomain: "talent-verify.firebaseapp.com",
  projectId: "talent-verify",
  storageBucket: "talent-verify.appspot.com",
  messagingSenderId: "835339792194",
  appId: "1:835339792194:web:c0588ac0c10eb0ea3ce2db",
  measurementId: "G-657D547R69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

