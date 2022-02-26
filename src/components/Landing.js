import React, { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();
const user = auth.currentUser;

export default function Landing() {
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const userResult = result.user;
        //...
        console.log(userResult);
        setDoc(
          doc(db, "users", userResult.uid),
          {
            name: userResult.displayName,
            email: userResult.email,
            photoUrl: userResult.photoURL,
            id: userResult.uid,
          },
          { merge: true }
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (user) {
    return (
      <div>
        <h1>USER LOGGED IN AS: {user.displayName}</h1>
        <button
          className="w-1/2 rounded-lg bg-slate-600"
          onClick={handleSignOut}
        >
          SIGN-OUT
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>C SA LA?</p>
        <button
          className="w-1/2 rounded-lg bg-slate-600"
          onClick={handleSignIn}
        >
          SIGN-IN WITH GOOGLE
        </button>
      </div>
    );
  }
}
