import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8Th8fbx837S1Qrvlc0ZjlUXVWTnhyF3w",
  authDomain: "codejam11.firebaseapp.com",
  projectId: "codejam11",
  storageBucket: "codejam11.appspot.com",
  messagingSenderId: "967979247013",
  appId: "1:967979247013:web:5ad4d09153abb28516f44c",
  measurementId: "G-3TE02JLGCF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
