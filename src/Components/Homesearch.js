// src/Components/HomeSearch.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query) return;

    const selectedResources = "character,movie,power,concept";

    navigate(
      `/search?query=${encodeURIComponent(query)}&resources=${selectedResources}`
    );
  };

  return (
    <div
      className="p-4 bg-dark text-white rounded shadow-lg border border-warning"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      <h2
        className="mb-3 text-warning text-center"
        style={{ textShadow: "2px 2px red" }}
      >
        ⚡ Comic Wiki Search ⚡
      </h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control border-warning"
          placeholder="Search for characters, movies, powers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{
            backgroundColor: "#1a1a1a",
            color: "#fff",
            borderWidth: "2px",
            fontWeight: "bold",
          }}
        />
        <button className="btn btn-warning fw-bold" onClick={handleSearch}>
          🔍 Search
        </button>
      </div>
    </div>
  );
}
