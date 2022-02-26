import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";

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
      <section className="flex my-[2%] flex-col items-center justify-center">
        <h1>Branches: {scene.children.length}</h1>
        <div className="bg-green-600 p-2 rounded-lg text-white my-2">
          <Link to="/branch/create" state={{ parent: scene }}>
            MAKE YOUR OWN BRANCH
          </Link>
        </div>
      </section>
    </div>
  );
}
