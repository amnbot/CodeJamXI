import React, {useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore"
import { db } from "../firebase-config";

export default function Home() {
  
  const[search,setSearch] = useState("");

  const fetch = () =>{

  }

  const filterSearch = async () =>{
    console.log("click!");
    const q = query(collection(db, "scenes"), where("title", "array-contains-any", search.split(" ")));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    })
  }

  const handleInput = (e) =>{
    setSearch(e.target.value);
  }

  return (
    <div flex inline>

    <input 
    onChange={handleInput}
    placeholder="Scene Title"
    maxLength="100"
    className="m-auto mb-2.5 border-black px-3 py-4 flex text-black bg-white rounded text-base border-0 shadow w-1/2"/>
    
    <button onClick={filterSearch}>Search</button>
    </div>
    );

}
