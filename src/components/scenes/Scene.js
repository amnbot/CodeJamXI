import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { theme } from "../../constants/constants";
import { db } from "../../firebase-config";
import { UserContext } from "../../App";
import LeftArrowIcon from "../ui/icons/LeftArrowIcon";
import RightArrowIcon from "../ui/icons/RightArrowIcon";
import ListItem from "../ui/ListItem";
import HeartFill from "../ui/icons/HeartFill";
import HeartBorder from "../ui/icons/HeartBorder";

export default function Scene() {
  let { id } = useParams();
  let location = useLocation();
  const { scene } = location.state;

  const user = useContext(UserContext);

  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getSceneParents(scene.parents.split(" "));
    getSceneChildren();
    getUserLikedScene();
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

  const getUserLikedScene = () => {
    console.log(user.liked);
    if (user.liked === undefined) {
      setLiked(false);
    } else {
      if (user.liked.includes(scene.id)) setLiked(true);
      console.log(liked);
    }
  };

  const displayItems = (items, anc = false) => {
    return (
      <div className="flex flex-row justify-start">
        <ul className="space-y-3 text-center">
          {items.map((scene, index) => (
            <div key={scene.id}>
              <li>
                <Link to={`/scene/${scene.id}`} state={{ scene: scene }}>
                  <ListItem>
                    <div className="inline-flex ml-2">
                      <div>
                        <h1 className="text-app-button uppercase tracking-widest">
                          {scene.title.join(" ")}
                        </h1>
                        <h1 className="text-app-button italic uppercase tracking-wide text-sm text-left">
                          {"Scene number: " +
                            (anc ? index + 1 : parents.length + 2)}
                        </h1>
                      </div>
                      <div className="my-auto ml-10">
                        <RightArrowIcon />
                      </div>
                    </div>
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
      <div className="flex flex-col justify-center items-center m-auto">
        <div className="flex flex-col text-right justify-end uppercase text-app-button space-y-5">
          {parents.length > 0 ? (
            <h1 className="text-lg font-black text-white text-left tracking-widest my-2">
              PREVIOUS SCENES
            </h1>
          ) : null}
          <div className="text-right">
            {parents.length > 0 ? (
              <Link
                to={`/scene/${parents[0].id}`}
                state={{ scene: parents[0] }}
              >
                <ListItem>
                  <div className="inline-flex">
                    <div className="my-auto mr-10">
                      <LeftArrowIcon />
                    </div>
                    <div>
                      <h1 className="uppercase italic tracking-widest text-sm ">
                        Original scene
                      </h1>
                      <h1>{parents[0].title.join(" ").toUpperCase()}</h1>
                    </div>
                  </div>
                </ListItem>
              </Link>
            ) : null}
          </div>
          <div className="">
            {parents.length > 1 ? (
              <Link
                to={`/scene/${parents[parents.length - 1].id}`}
                state={{ scene: parents[parents.length - 1] }}
              >
                <ListItem>
                  <div className="inline-flex">
                    <div className="my-auto mr-10">
                      <LeftArrowIcon />
                    </div>
                    <div>
                      <h1 className="uppercase italic tracking-widest text-sm ">
                        previous scene
                      </h1>
                      <h1>
                        {parents[parents.length - 1].title
                          .join(" ")
                          .toUpperCase()}
                      </h1>
                    </div>
                  </div>
                </ListItem>
              </Link>
            ) : null}
          </div>
        </div>
        <Link to="/create" state={{ parent: scene }}>
          <div className="bg-app-button p-2 rounded-lg text-app-button-text text-center my-2">
            START YOUR OWN STORY
          </div>
        </Link>
      </div>
    );
  };

  const displayChildren = () => {
    return (
      <div className="flex flex-col justify-center items-center m-auto">
        <div className="flex flex-col text-right">
          {children.length > 0 ? (
            <h1 className="text-lg font-black tracking-widest my-2">
              BRANCHES
            </h1>
          ) : null}
          {displayItems(children)}
        </div>
        <Link to="/branch/create" state={{ parent: scene }}>
          <div className="bg-app-button p-2 rounded-lg text-app-button-text text-center my-10">
            MAKE YOUR OWN BRANCH
          </div>
        </Link>
      </div>
    );
  };

  const handleLikes = async (e) => {
    if (!liked) {
      await updateDoc(doc(db, "scenes", scene.id), {
        likes: increment(1),
      });

      await updateDoc(doc(db, "users", user.id), {
        liked: arrayUnion(scene.id),
      });

      setLiked(true);
    } else {
      await updateDoc(doc(db, "scenes", scene.id), {
        likes: increment(-1),
      });

      await updateDoc(doc(db, "users", user.id), {
        liked: arrayRemove(scene.id),
      });
      setLiked(false);
    }
  };

  //console.log(scene.children, scene.parents.split(" "));

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="text-center">
        <h1 className="text-4xl tracking-widest my-10 uppercase font-bold">
          {scene.title.join(" ")}
        </h1>
        <div className="w-[100%] bg-app-card rounded-[30px] p-5 text-app-text space-y-7">
          <div className="flex flex-row">
            <div className="flex flex-col justify-start m-auto">
              <h1 className="tracking-widest font-extralight text-xl">STORY</h1>
              <i className="tracking-widest">
                SCENE NUMBER: {parents.length + 1}
              </i>
            </div>
          </div>
          <p className="text-xl">{scene.text}</p>
        </div>
      </section>
      <div className="flex flex-row justify-center m-auto mt-5">
        <div className="">
          <button className="" onClick={handleLikes}>
            {liked ? <HeartFill /> : <HeartBorder />}
          </button>
        </div>
        <h1 className="mx-2 my-auto text-xl">{scene.likes}</h1>
      </div>
      <section className=" my-[2%] items-center justify-center">
        <div className=" my-1 gap-20  w-[100%]">
          {displayParents()}
          {displayChildren()}
        </div>
      </section>
    </div>
  );
}
