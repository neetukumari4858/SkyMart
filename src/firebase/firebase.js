import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADF1euE8PBQkRx4DirUvlYgXTWtXykSMs",
  authDomain: "e-commerce-2b948.firebaseapp.com",
  projectId: "e-commerce-2b948",
  storageBucket: "e-commerce-2b948.firebasestorage.app",
  messagingSenderId: "102852362511",
  appId: "1:102852362511:web:c7d8f932f86e4aa923be7a",
  measurementId: "G-08S1PEDW8D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
