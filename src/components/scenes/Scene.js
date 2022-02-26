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
          {scene.title.join(" ").toUppercase()}
        </h1>
        <p>{scene.text}</p>
      </section>
      <section>
        <ul>
          <h1>LOL</h1>
        </ul>
      </section>
    </div>
  );
}
