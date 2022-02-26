import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function Scene() {
  let { id } = useParams();
  let location = useLocation();
  const { scene } = location.state;
  console.log(id, scene);

  return (
    <div>
      <h3>{id}</h3>
    </div>
  );
}
