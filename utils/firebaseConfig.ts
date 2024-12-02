// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHoERZfKmBXkFqZRT1AHBbVxLBTR9mPqo",
  authDomain: "healthfitai.firebaseapp.com",
  projectId: "healthfitai",
  storageBucket: "healthfitai.firebasestorage.app",
  messagingSenderId: "838933123235",
  appId: "1:838933123235:web:e40a46a6ebdd3ebdf5ef16",
  measurementId: "G-6QWBK29KLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app