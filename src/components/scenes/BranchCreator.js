import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { UserContext } from "../../App";
import { tags, sceneConstructor } from "../../constants/constants";
import { useLocation } from "react-router-dom";
import SceneCreator from "./SceneCreator";

export default function BranchCreator() {
  let location = useLocation();
  const { parent } = location.state;
  return (
    <div className="flex flex-col text-center justify-center items-center space-y-4 my-[1%] tracking-wider">
      <section className="flex flex-col space-y-7 items-center justify-center">
        <h1>
          Branching from:{" "}
          <b className="uppercase tracking-wider">{parent.title.join(" ")}</b>{" "}
          from <b>{parent.creatorName}</b>
        </h1>
        <div className="bg-app-card w-[75%] p-7 rounded-xl text-white">
          <h1 className="font-light uppercase mb-3 text-xl tracking-widest">
            Previous scene
          </h1>
          <p>
            <i>{parent.text}</i>
          </p>
        </div>
      </section>
      <section>
        <SceneCreator isChild={true} parent={parent} />
      </section>
    </div>
  );
}
