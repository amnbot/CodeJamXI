import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../Home";
import About from "./About";
import SceneCreator from "./SceneCreator";

export default function Navbar() {
  return (
    <BrowserRouter>
      <div className="flex inline justify-center w-full bg-green-600 text-white uppercase tracking-widest py-8">
        <nav>
          <ul className="flex inline gap-16 md:gap-44">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<SceneCreator />} />
      </Routes>
    </BrowserRouter>
  );
}
