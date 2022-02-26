import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { UserContext } from "../../App";
import { tags, sceneConstructor } from "../../constants/constants";

export default function SceneCreator() {
  const user = useContext(UserContext);
  // console.log(user);
  const[storyTags, setStoryTags] = useState(tags);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [chars, setChars] = useState(0);

  const onCheckChange = (e) =>{
    //console.log(e.target)
    
    const temp = [...storyTags];

    for (let i = 0; i < temp.length; i++) {
      
      if(temp[i].tag == e.target.id){
        temp[i].value = Boolean(e.target.checked);
      }
    }
    setStoryTags(temp);
    //console.log(storyTags);
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
    //console.log(text)
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setChars(text.length);
  }, [text]);

  const submit = (e) => {
    if (text.length < 50) {
      alert("Text must have at least 50 characters");
      return;
    }

    if (title.length == 0) {
      alert("Scene must have a title");
      return;
    }
    const titleWords = title.toLowerCase().split(" ");
    //console.log({title: title, text:text})
    const toSumbit = {
      ...sceneConstructor,
      title: titleWords,
      text,
      creatorId: user.id,
      creatorName: user.name,
      tags: storyTags,
    };
    submitScene(toSumbit);
    setTitle("");
    setText("");
  };

  const submitScene = (scene) => {
    console.log(scene);
    addDoc(collection(db, "scenes"), scene);
  };

  return (
    <div className="flex-col content-center mt-3.5">
      <h1 className="flex m-auto text-4xl justify-center mb-2.5">
        Write a new scene
      </h1>
      <div className="m-auto">
        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="Scene Title"
          maxLength="100"
          className="m-auto mb-2.5 border-black px-3 py-4 flex text-black bg-white rounded text-base border-0 shadow w-1/2"
        />
      </div>

      <textarea
        value={text}
        onChange={handleTextChange}
        maxLength="500"
        className="mb-2.5 m-auto border-black px-3 py-4  flex text-black bg-white rounded text-base border-0 shadow w-1/2"
        rows="3"
        placeholder={"Your text..."}
      />

      <div className="m-auto flex content-center">
        <h1 className="flex m-auto mb-2.5">{chars}/500 characters</h1>
      </div>

        <div className="flex flex-row justify-center ">
        <ul>
          {storyTags.map((tag) => ( 
            <li>
              <input className="text-black" type="checkbox" onChange={onCheckChange} id={tag.tag} value={tag.value}/>{tag.tag}
            </li>
          ))}
        </ul>
        </div>
      <div className="flex m-auto items-center">
        <button
          onClick={submit}
          className="flex m-auto justify-center content-center bg-green-600 text-white rounded-lg px-3 w-1/4 mt-1.5"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
