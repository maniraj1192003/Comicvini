import React from "react";
import HomeSearch from "../Components/Homesearch";
import ComicCardPage from "../Components/ComicCardPage";

export default function HomePage() {
  return (
    <div 
      className="min-vh-100 d-flex flex-column align-items-center justify-content-start p-4"
      style={{
        backgroundColor: "#121212",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        backgroundImage: "url('/comic-bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <h1
        className="text-warning text-center mb-5"
        style={{
          fontSize: "3rem",
          textShadow: "3px 3px red, -2px 2px blue, 2px -2px yellow"
        }}
      >
        🦸‍♂️ Comic Wiki 🦸‍♀️
      </h1>
      <div className="w-100 w-md-75 w-lg-50">
        <HomeSearch />
        <ComicCardPage />
      </div>
      <div className="mt-5 w-100">
      </div>
    </div>
  );
}