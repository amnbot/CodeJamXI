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
    <div className="flex flex-col text-center space-y-4 my-[1%]">
      <section className="space-y-7">
        <h1>
          Branching from: {parent.title.join(" ").toUpperCase()} from{" "}
          {parent.creatorName}
        </h1>
        <p>{parent.text}</p>
      </section>
      <section>
        <SceneCreator isChild={true} parent={parent} />
      </section>
    </div>
  );
}
