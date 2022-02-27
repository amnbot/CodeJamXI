import "./App.css";
import React, { useState, useEffect } from "react";
import { authentication, app, db } from "./firebase-config";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import SceneCreator from "./components/scenes/SceneCreator";
import Navbar from "./components/NavBar";

const provider = new GoogleAuthProvider();

export const UserContext = React.createContext(authentication.currentUser);

function App() {
  // Check if user is logged in upon mounting component
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  // User logged in sate
  const [loggedIn, setLoggedIn] = useState(false);
  // User state
  const [user, setUser] = useState(null);

  const checkIfLoggedIn = () => {
    authentication.onAuthStateChanged(function (user) {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          id: user.uid,
        });
        setLoggedIn(true);
      } else setLoggedIn(false);
    });
  };

  const handleSignIn = async () => {
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
        //console.log(user);
        //console.log(loggedIn);
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
        setUser(null);
        setLoggedIn(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else setLoggedIn(false);
  }, [user]);

  if (!loggedIn) {
    return (
      <div className="flex justify-center items-center flex-col my-[20%]">
        <h1 className="text-2xl font-bold font-mono">
          Please log in to continue
        </h1>
        <button
          className="flex font-mono font-bold m-auto justify-center content-center bg-green-600 text-white rounded-lg px-3 w-1/3 mt-1.5"
          onClick={handleSignIn}
        >
          LOG IN
        </button>
      </div>
    );
  }
  //console.log(user);
  return (
    <UserContext.Provider value={user}>
      <div className="flex flex-col h-screen items-center font-[Montserrat] bg-app-bg text-app-text">
        <Navbar />
      </div>
      <footer className="text-app-text">
        <div className="fixed flex m-auto mx-10 gap-3 justify-center items-center bottom-10 text-center">
          <div>
            <h1>Logged in as: {user.name}</h1>
          </div>

          <button
            className=" bg-red-400 text-white rounded-lg px-3"
            onClick={handleSignOut}
          >
            LOG OUT
          </button>
        </div>
      </footer>
    </UserContext.Provider>
  );
}

export default App;
