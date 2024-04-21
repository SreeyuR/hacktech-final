
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, googleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDZz0AonEUGTTqSnIoizPwf_GI9flU7L54",
authDomain: "login-page-demo-5c1d2.firebaseapp.com",
projectId: "login-page-demo-5c1d2",
storageBucket: "login-page-demo-5c1d2.appspot.com",
messagingSenderId: "999655653673",
appId: "1:999655653673:web:66efe96327bc4de59f7738"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new googleAuthProvider();