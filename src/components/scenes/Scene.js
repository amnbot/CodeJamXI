import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { theme } from "../../constants/constants";
import { db } from "../../firebase-config";
import ListItem from "../ui/ListItem";

export default function Scene() {
  let { id } = useParams();
  let location = useLocation();
  const { scene } = location.state;

  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    getSceneParents(scene.parents.split(" "));
    getSceneChildren();
  }, [id]);

  const getSceneParents = async (pIds) => {
    let pObjs = [];

    for (let i = 0; i < pIds.length; i++) {
      if (pIds[i]) {
        const snapshot = await getDoc(doc(db, "scenes", pIds[i]));
        pObjs.push({ id: snapshot.id, ...snapshot.data() });
      }
    }

    setParents(pObjs);
  };

  const getSceneChildren = async () => {
    let cIds = scene.children;
    let cObjs = [];

    for (let i = 0; i < cIds.length; i++) {
      if (cIds[i]) {
        const snapshot = await getDoc(doc(db, "scenes", cIds[i]));
        cObjs.push({ id: snapshot.id, ...snapshot.data() });
      }
    }

    setChildren(cObjs);
  };

  const displayItems = (items, anc = false) => {
    return (
      <div className="flex flex-row">
        <ul className="space-y-3 text-center">
          {items.map((scene, index) => (
            <div
              key={scene.id}
              className={anc ? `pr-[${200 * (index + 1)}px]` : ""}
            >
              <li>
                <Link to={`/scene/${scene.id}`} state={{ scene: scene }}>
                  <ListItem>
                    <h1 className="text-app-button uppercase tracking-widest">
                      {scene.title.join(" ")}
                    </h1>
                    <h1 className="text-app-button italic uppercase tracking-wide text-sm">
                      {"Scene number: " +
                        (anc ? index + 1 : parents.length + 2)}
                    </h1>
                  </ListItem>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  const displayParents = () => {
    return (
      <div className="inline-flex m-auto justify-center items-center">
        <h1 className="text-lg font-black tracking-widest my-2">
          PREVIOUS SCENES
        </h1>
        <div className="rounded-[50%] bg-app-card p-4 m-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#ffacca"
          >
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
            <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          {displayItems(parents, true)}
          <Link to="/create" state={{ parent: scene }}>
            <div className="bg-app-button p-2 rounded-lg text-app-button-text text-center my-2">
              CREATE YOUR OWN STORY
            </div>
          </Link>
        </div>
      </div>
    );
  };

  const displayChildren = () => {
    return (
      <div className="inline-flex justify-center items-center m-auto">
        <div className="flex flex-col text-right">
          {displayItems(children)}
          <Link to="/branch/create" state={{ parent: scene }}>
            <div className="bg-app-button p-2 rounded-lg text-app-button-text text-center my-2">
              MAKE YOUR OWN BRANCH
            </div>
          </Link>
        </div>
        <div className="rounded-[50%] bg-app-card p-4 m-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#ffacca"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
            </g>
          </svg>
        </div>
        <h1 className="text-lg font-black tracking-widest my-2">BRANCHES</h1>
      </div>
    );
  };

  //console.log(scene.children, scene.parents.split(" "));

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="text-center">
        <h1 className="text-4xl tracking-widest my-10 uppercase font-bold">
          {scene.title.join(" ")}
        </h1>
        <div className="w-[100%] bg-app-button rounded-[30px] p-5 text-app-button-text space-y-7">
          <h1 className="tracking-widest font-extralight text-xl">STORY</h1>
          <i className="tracking-widest">SCENE NUMBER: {parents.length + 1}</i>
          <p className="text-xl">{scene.text}</p>
        </div>
      </section>
      <section className="flex my-[2%] flex-col items-center justify-center">
        <div className="flex flex-row  my-20 gap-32  w-[100%]">
          {displayParents()}
          {displayChildren()}
        </div>
      </section>
    </div>
  );
}
