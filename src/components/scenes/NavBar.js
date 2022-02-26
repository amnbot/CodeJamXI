import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-600 mb-3">
        <div>
          <a
            class="transform text-white transition-transform hover:scale-110 mx-4 text-lg"
            href="/create"
          >
            CREATE
          </a>
          <a
            class="transform text-white transition-transform hover:scale-110 mx-4 text-lg"
            href="/about"
          >
            ABOUT
          </a>
        </div>
      </nav>
    </>
  );
}
