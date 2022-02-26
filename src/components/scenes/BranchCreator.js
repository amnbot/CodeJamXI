import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { UserContext } from "../../App";
import { tags, sceneConstructor } from "../../constants/constants";

export default function BranchCreator() {
  return (
    <div>
      BranchCreator
      <h1>HELLO</h1>
    </div>
  );
}
