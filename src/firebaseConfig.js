
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3s6_8IPTZXn4lNXwlMbnCnEXhoJaJFwY",
  authDomain: "catbook-3b2a4.firebaseapp.com",
  projectId: "catbook-3b2a4",
  storageBucket: "catbook-3b2a4.appspot.com",
  messagingSenderId: "295617630645",
  appId: "1:295617630645:web:bfedc1e934487b7a3349fc",
  measurementId: "G-84G8KR81KP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics, signInWithPopup };