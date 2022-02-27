import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Scene from "./scenes/Scene";
import { tags } from "../constants/constants";
import ListItem from "./ui/ListItem";

export default function Home() {
  const [storyTags, setStoryTags] = useState(tags);
  const [sceneList, setSceneList] = useState([]);
  const [search, setSearch] = useState("");

  const onCheckChange = (e) => {
    //console.log(e.target)

    const temp = [...storyTags];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].tag == e.target.id) {
        temp[i].value = Boolean(e.target.checked);
      }
    }
    setStoryTags(temp);
    //console.log(storyTags);
  };

  const filterSearch = async () => {
    let scenes = [];
    const q = query(
      collection(db, "scenes"),
      where("title", "array-contains-any", search.toLowerCase().split(" "))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //console.log(doc.data(), doc.id);

      scenes.push({ id: doc.id, ...doc.data() });
    });
    const trueTags = storyTags.filter((el) => {
      return el.value === true;
    });

    if (trueTags.length > 0) {
      const q2 = query(
        collection(db, "scenes"),
        where("tags", "array-contains-any", trueTags)
      );

      const querySnapshot2 = await getDocs(q2);

      querySnapshot2.forEach((doc) => {
        if (!scenes.includes({ id: doc.id, ...doc.data() })) {
          scenes.push({ id: doc.id, ...doc.data() });
        }
      });
    }
    setSceneList(scenes);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const displayScenes = () => {
    return (
      <div className="my-2.5 text-white">
        <ul className="space-y-5">
          {sceneList.map((scene) => (
            <div key={scene.id}>
              <li>
                <ListItem>
                  <Link to={`/scene/${scene.id}`} state={{ scene: scene }}>
                    <h1 className="uppercase text-lg tracking-widest text-center">
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
    <div className="flex flex-col items-center justify-center mt-[2%]">
      <h1 className="flex text-4xl mt-2.5">Browse Scenes</h1>

      <input
        onChange={handleInput}
        placeholder="Search by name or tag..."
        maxLength="100"
        className="m-auto mt-2.5 mb-2.5 border-black px-3 py-4 flex text-black bg-white rounded text-base border-0 shadow w-1/2"
      />
      <div className="flex justify-center text-center items-center">
        <ul>
          {storyTags.map((tag) => (
            <div className="inline-flex mx-3" key={tag.tag}>
              <li>
                <input
                  className="text-black mx-2"
                  type="checkbox"
                  id={tag.tag}
                  onChange={onCheckChange}
                  value={tag.value}
                />
                {tag.tag}
              </li>
            </div>
          ))}
        </ul>
      </div>

      <button
        className={
          "flex my-5  uppercase p-2 bg-app-button rounded-lg w-1/5 text-app-button-text justify-center"
        }
        onClick={filterSearch}
      >
        Search
      </button>
      <div>{sceneList.length > 0 ? displayScenes() : null}</div>
    </div>
  );
}
