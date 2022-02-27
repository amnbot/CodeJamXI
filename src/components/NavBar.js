import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import SceneCreator from "./scenes/SceneCreator";
import BranchCreator from "./scenes/BranchCreator";
import Scene from "./scenes/Scene";
import Profile from "./Profile";
import applogo from "../applogo.png";

export default function Navbar() {
  return (
    <BrowserRouter>
      <div className="inline-flex  w-screen bg-app-nav-bar text-white uppercase tracking-widest py-3">
        <nav>
          <ul className="flex inline justify-start ml-10 gap-4 md:gap-10">
            <li className="transition-transform hover:scale-110">
              <Link to="/">Home</Link>
            </li>
            <li className="transition-transform hover:scale-110">
              <Link to="/about">About</Link>
            </li>
            <li className="transition-transform hover:scale-110">
              <Link to="/create">Create</Link>
            </li>
            <li className="transition-transform hover:scale-110">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <div className="flex inline w-full mr-10 justify-end">
          <div className="w-[30px]">
            <img src={applogo} alt="logo" />
          </div>
          <h1 className="font-black text-xl tracking-[-0.0em]">
            STORY<i className="text-app-button">HOLIC</i>
          </h1>
        </div>
      </div>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<SceneCreator />} />
        <Route path="/scene/:id" element={<Scene />} />
        <Route path="/branch/create" element={<BranchCreator />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
