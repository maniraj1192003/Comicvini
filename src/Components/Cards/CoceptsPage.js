import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ConceptsPage = () => {
  const [concepts, setConcepts] = useState([]);
  const [filters, setFilters] = useState({ name: "" });
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const fetchConcepts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const url = `https://comicvinibackend.onrender.com/api/concepts?${params}`;
      const response = await fetch(url);
      const data = await response.json();

      let results = data.results || [];

      // Sorting by start_year
      results = results.sort((a, b) => {
        const yearA = parseInt(a.start_year) || 0;
        const yearB = parseInt(b.start_year) || 0;
        return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
      });

      setConcepts(results);
    } catch (err) {
      console.error(err);
      setConcepts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConcepts(); // fetch on mount & when sort changes
  }, [sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchConcepts();
  };

  return (
    <div className="container-fluid bg-black text-white min-vh-100 py-4">
      <h2
        className="text-warning text-center mb-4"
        style={{ fontFamily: "'Comic Sans MS', cursive", textShadow: "2px 2px red" }}
      >
        🧩 Comic Concepts 🧩
      </h2>

      {/* Search + Sort Form */}
      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        {/* Search by Name */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label text-warning">
            Concept Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control bg-dark text-white border-warning"
            placeholder="Enter concept name"
            value={filters.name}
            onChange={handleChange}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="col-md-6">
          <label htmlFor="sortOrder" className="form-label text-warning">
            Sort by Start Year
          </label>
          <select
            id="sortOrder"
            className="form-control bg-dark text-white border-warning"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-warning px-5">
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="row">
        {concepts.length === 0 && !loading && (
          <div className="col-12 text-center text-warning">
            No concepts found.
          </div>
        )}

        {concepts.map((c) => (
          <div className="col-md-4 mb-4" key={c.id}>
            <div className="card bg-dark text-white border border-warning shadow-lg h-100">
              {c.image?.medium_url && (
                <img
                  src={c.image.medium_url}
                  alt={c.name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-warning">{c.name}</h5>
                <p className="card-text" style={{ flexGrow: 1 }}>
                  {c.deck || "No description available"}
                </p>
                <ul className="list-unstyled mb-2">
                  <li>
                    <strong>First Appeared:</strong>{" "}
                    {c.first_appeared_in_issue?.name || "N/A"}
                  </li>
                  <li>
                    <strong>Start Year:</strong> {c.start_year || "N/A"}
                  </li>
                  <li>
                    <strong>Issue Appearances:</strong>{" "}
                    {c.count_of_issue_appearances || 0}
                  </li>
                </ul>


                <a
  href={c.site_detail_url}
  target="_blank"
  rel="noreferrer"
  className="btn btn-warning mt-auto"
>
  View Details
</a>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptsPage;
