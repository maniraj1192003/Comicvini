import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    studio: "",
    rating: "", // Added rating filter
  });

  const navigate = useNavigate(); // For the Back button

  const fetchMovies = async () => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`https://comicvinibackend.onrender.com/api/movies?${params}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="bg-black min-vh-100 py-4">
      <div className="container">

        {/* Back button */}
        <div className="mb-3">
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <h2 className="text-warning text-center mb-4">🎬 Comic Movies</h2>

        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col">
              <input
                type="text"
                name="name"
                placeholder="Movie Name"
                className="form-control"
                value={filters.name}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="studio"
                placeholder="Studio"
                className="form-control"
                value={filters.studio}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <select
                name="rating"
                className="form-control"
                value={filters.rating}
                onChange={handleChange}
              >
                <option value="">All Ratings</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
              </select>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-warning w-100">
                Apply Filters
              </button>
            </div>
          </div>
        </form>

        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.guid || movie.id}>
              <div className="card bg-dark text-white border border-warning shadow-lg h-100">
                {movie.image?.medium_url && (
                  <img
                    src={movie.image.medium_url}
                    alt={movie.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-warning">{movie.name}</h5>
                  <p className="card-text">
                    {movie.deck || "No description available"}
                  </p>
                  <p className="text-muted">
                    {movie.studios && `Studio: ${movie.studios.map(s => s.name).join(", ")}`}
                  </p>
                  <p className="text-info">Rating: {movie.rating || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
