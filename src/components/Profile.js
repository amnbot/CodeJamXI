import {
  collection,
  getDocs,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import ListItem from "./ui/ListItem";

export default function Profile() {
  const user = useContext(UserContext);
  const [userScenes, setUserScenes] = useState([]);
  const [likedScenes, setLikedScenes] = useState([]);

  useEffect(() => {
    getUserScenes();
    getUserLikes();
  }, []);

  const getUserLikes = async () => {
    let liked = [];
    const snapshot = await getDoc(doc(db, "users", user.id));
    const uLiked = snapshot.data().liked;

    for (let i = 0; i < uLiked.length; i++) {
      const snapshot2 = await getDoc(doc(db, "scenes", uLiked[i]));
      liked.push({ id: snapshot2.id, ...snapshot2.data() });
    }
    setLikedScenes(liked);
  };

  const getUserScenes = async () => {
    let scenes = [];

    const q = query(
      collection(db, "scenes"),
      where("creatorId", "==", user.id)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      scenes.push({ id: doc.id, ...doc.data() });
    });

    setUserScenes(scenes);
  };

  const displayItems = (items) => {
    return (
      <div className="my-2.5 text-app-button">
        <ul className="space-y-5">
          {items.map((scene) => (
            <div
              key={scene.id}
              className="transition-transform hover:scale-110"
            >
              <li>
                <ListItem>
                  <Link to={`/scene/${scene.id}`} state={{ scene: scene }}>
                    <h1 className="uppercase text-xl tracking-widest text-center">
                      {scene.title.join(" ")}
                    </h1>
                  </Link>
                </ListItem>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div>
      <div className="flex flex-row justify-center gap-[2%] my-[2%]">
        <img src={user.photoUrl} alt="User" className="rounded-full" />
        <h1 className="flex text-2xl justify-center content-center mt-[3%]">
          {user.name}'s user profile
        </h1>
      </div>

      <div className="my-[5%]">
        <h2 className="flex text-2xl justify-center content-center">
          Scenes you wrote
        </h2>
        {displayItems(userScenes)}
      </div>

      <div className="my-[5%]">
        <h2 className="flex text-2xl justify-center content-center">
          Scenes you liked
        </h2>
        {displayItems(likedScenes)}
      </div>
    </div>
  );
}
