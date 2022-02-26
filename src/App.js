import "./App.css";
import React, { useState, useEffect } from "react";
import { authentication, app } from "./firebase-config";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const UserContext = React.createContext(authentication.currentUser);

import SceneCreator from "./components/scenes/SceneCreator";

function App() {
  // Check if user is logged in upon mounting component
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  // User logged in sate
  const [loggedIn, setLoggedIn] = useState(false);

  const checkIfLoggedIn = () => {
    authentication.onAuthStateChanged(function (user) {
      if (user) {
        setLoggedIn(false);
      } else setLoggedIn(true);
    });
  };

  const handleSignIn = () => {
    signInWithPopup(authentication, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const userResult = result.user;
        //...
        // console.log(userResult);
        // Add user to firestore doc with id of uid
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
        setUser({
          name: userResult.displayName,
          email: userResult.email,
          photoUrl: userResult.photoURL,
          id: userResult.uid,
        });
        setLoggedIn(true);
        console.log(loggedIn);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // User state
  const [user, setUser] = useState(authentication.currentUser);

  if (!loggedIn) {
    return (
      <div className="flex justify-center items-center flex-col my-[50%]">
        <h1>NOT LOGGED IN</h1>
        <button className="w-1/3 bg-slate-600" onClick={handleSignIn}>
          LOG IN
        </button>
      </div>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <div>
        <h1>LOGGED IN AS: {user.name}</h1>
      </div>
      <SceneCreator/>
    </UserContext.Provider>
    
        
    
  );
}

export default App;
