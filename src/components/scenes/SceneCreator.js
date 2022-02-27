import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { UserContext } from "../../App";
import { tags, sceneConstructor } from "../../constants/constants";

export default function SceneCreator({ isChild, parent }) {
  const user = useContext(UserContext);
  // console.log(user);
  const [storyTags, setStoryTags] = useState(tags);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (isChild) {
      setStoryTags(parent.tags);
    }
  }, []);

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
    const toSubmit = {
      ...sceneConstructor,
      title: titleWords,
      text,
      creatorId: user.id,
      creatorName: user.name,
      tags: storyTags,
      parents: isChild ? parent.parents + " " + parent.id : "",
    };

    submitScene(toSubmit);
    setTitle("");
    setText("");
  };

  const submitScene = async (scene) => {
    // console.log(scene);
    const docRef = await addDoc(collection(db, "scenes"), scene);
    if (isChild) {
      setDoc(
        doc(db, "scenes", parent.id),
        {
          children: arrayUnion(docRef.id),
        },
        { merge: true }
      );
    }
  };

  return (
    <div className="flex justify-center m-auto items-center text-center">
      <div className="flex flex-col m-auto items-center">
        <h1 className=" text-2xl sm:text-4xl mb-5 uppercase tracking-widest font-bold">
          Write a new scene
        </h1>
        <div className="flex flex-col space-y-6 w-[90%] sm:w-[100%] text-center justify-center items-center bg-app-card p-10 rounded-[20px]">
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="Scene Title"
            maxLength="100"
            className="w-[115%] sm:w-[100%] mb-2.5px-3 py-4 text-black bg-white rounded-lg border-0 shadow"
          />

          <textarea
            value={text}
            onChange={handleTextChange}
            maxLength="500"
            className="w-[115%] sm:w-[100%] mb-2.5 px-3 py-4 text-black bg-white rounded-lg border-0 shadow "
            rows="3"
            placeholder={"Your text..."}
          />

          <div className="">
            <h1 className="mb-2.5 text-app-button">{chars}/500 characters</h1>
          </div>

          <div className="text-center items-center ">
            <ul>
              {storyTags.map((tag) => (
                <div className="inline-flex mx-3 text-app-button" key={tag.tag}>
                  <li>
                    <input
                      className="text-app-button mx-2 accent-app-button"
                      type="checkbox"
                      onChange={onCheckChange}
                      id={tag.tag}
                      value={tag.value}
                      checked={tag.value}
                    />
                    {tag.tag}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="">
          <button
            onClick={submit}
            className="bg-app-button text-app-button-text px-10 py-2 my-10 rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
