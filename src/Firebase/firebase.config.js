// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOeBi57neswEyHv_vQTTO8zBMtKbX4VpE",
  authDomain: "food-sharing-website-115b4.firebaseapp.com",
  projectId: "food-sharing-website-115b4",
  storageBucket: "food-sharing-website-115b4.firebasestorage.app",
  messagingSenderId: "580755799079",
  appId: "1:580755799079:web:6a1f27eb838e19e1752202"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;