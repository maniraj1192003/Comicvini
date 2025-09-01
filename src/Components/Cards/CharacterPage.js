import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState({ name: "", gender: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const limit = 20; // items per page

  const navigate = useNavigate(); // For the Back button

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchCharacters = async (filterParams = {}, pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        ...filterParams,
        limit,
        offset: (pageNumber - 1) * limit,
      }).toString();

      const url = `http://localhost:5000/api/characters?${params}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch characters");
      const data = await response.json();

      setCharacters(data.results || []);
      setTotalResults(data.number_of_total_results || data.results.length);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setCharacters([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters(filters, page);
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page on new search
    fetchCharacters(filters, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className="container-fluid bg-black text-white min-vh-100 py-4">
      
      {/* Back button */}
      <div className="mb-3">
        <button
          className="btn btn-outline-warning"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <h2 className="text-warning text-center mb-4">🦸 Comic Characters 🦸</h2>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="name"
            className="form-control bg-dark text-white border-warning"
            placeholder="Search by Name"
            value={filters.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <select
            name="gender"
            className="form-select bg-dark text-white border-warning"
            value={filters.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-warning w-100">
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {error && <div className="text-danger mb-3 text-center">{error}</div>}

      <div className="row">
        {characters.length === 0 && !loading && (
          <div className="col-12 text-center text-muted">
            No characters found.
          </div>
        )}

        {characters.map((character) => (
          <div className="col-md-4 mb-4" key={character.id}>
            <div className="card bg-dark text-white border border-warning shadow-lg h-100">
              {character.image?.medium_url && (
                <img
                  src={character.image.medium_url}
                  alt={character.name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-warning">{character.name}</h5>
                <p className="card-text">{character.deck || "No description available"}</p>
                <Link
                  to={`/character/${character.id}`}
                  className="btn btn-warning"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary mx-1"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <span className="btn btn-dark mx-1">{page}</span>
          <button
            className="btn btn-secondary mx-1"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharactersPage;
