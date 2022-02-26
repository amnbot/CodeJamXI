import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Scene from "./scenes/Scene";

export default function Home() {
  const [sceneList, setSceneList] = useState([]);
  const [search, setSearch] = useState("");

  const filterSearch = async () => {
    let scenes = [];
    const q = query(
      collection(db, "scenes"),
      where("title", "array-contains-any", search.split(" "))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //console.log(doc.data(), doc.id);

      scenes.push({ id: doc.id, ...doc.data() });
    });

    setSceneList(scenes);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const displayScenes = () => {
    return (
      <div>
        <ul>
          {sceneList.map((scene) => (
            <li>
              <Link to={`/scene/${scene.id}`} state={{ scene: scene }}>
                {scene.id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <input
        onChange={handleInput}
        placeholder="Scene Title"
        maxLength="100"
        className="m-auto mb-2.5 border-black px-3 py-4 flex text-black bg-white rounded text-base border-0 shadow w-1/2"
      />

      <button onClick={filterSearch}>Search</button>
      <div>{sceneList.length > 0 ? displayScenes() : null}</div>
    </div>
  );
}
