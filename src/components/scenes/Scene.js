import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function Scene() {
  let { id } = useParams();
  let location = useLocation();
  const { scene } = location.state;

  return (
    <div className="flex flex-col justify-center items-center my-[10%]">
      <section>
        <h1 className="text-4xl tracking-wider my-10">
          {scene.title.join(" ")}
        </h1>
        <p>{scene.text}</p>
      </section>
      <button className="flex m-auto justify-center content-center bg-green-600 text-white rounded-lg px-3 w-1/4 mt-1.5">
        CONTINUE STORY
      </button>
    </div>
  );
}
