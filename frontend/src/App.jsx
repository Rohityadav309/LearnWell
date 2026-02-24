import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./Components/common/NavBar.jsx";
import Home from "./pages/Home";
// import Catalog from "./pages/Catalog"; // ✅ Added
import Login from "./pages/Login"; // ✅ Added
import Signup from "./pages/Signup"; // ✅ Added
import OpenRoute from "./Components/core/Auth/OpenRoute"; // ✅ Added

export default function App() {
  return (
    <div className="bg-richblack-900 min-h-screen w-full font-inter text-white">
      {/* Centered content container */}
      <div className="max-w-[var(--max-w-maxContent)] mx-auto px-4">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/catalog/:catalog" element={<Catalog />} /> */}
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
