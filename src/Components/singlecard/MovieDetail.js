// src/Components/Cards/MovieDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams(); // ✅ Get movie ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const response = await fetch(`https://comicvinibackend.onrender.com/api/movie/${id}`);
        const data = await response.json();
        setMovie(data.results); // now works correctly
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    loadMovie();
  }, [id]);

  if (!movie) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <Link to="/movies" className="btn btn-secondary mb-3">
        ⬅ Back to Movies
      </Link>

      <div className="card bg-dark text-white border border-warning shadow-lg p-3">
        {movie.image?.medium_url && (
          <img
            src={movie.image.medium_url}
            alt={movie.name}
            className="card-img-top mb-3"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h2 className="text-warning">{movie.name}</h2>
          <p>{movie.deck || "No description available"}</p>

          <div className="mt-3"><strong>Release Date:</strong> {movie.release_date || "N/A"}</div>
          <div><strong>Rating:</strong> {movie.rating || "N/A"}</div>
          <div><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} mins` : "N/A"}</div>
          <div><strong>Budget:</strong> {movie.budget || "N/A"}</div>
          <div><strong>Box Office Revenue:</strong> {movie.box_office_revenue || "N/A"}</div>
          <div><strong>Total Revenue:</strong> {movie.total_revenue || "N/A"}</div>
          <div><strong>Distributor:</strong> {movie.distributor || "N/A"}</div>
          <div><strong>Has Staff Review:</strong> {movie.has_staff_review ? "Yes" : "No"}</div>
          <div><strong>Date Added:</strong> {movie.date_added || "N/A"}</div>
          <div><strong>Last Updated:</strong> {movie.date_last_updated || "N/A"}</div>
          <div><strong>Producers:</strong> {movie.producers || "N/A"}</div>
          <div><strong>Writers:</strong> {movie.writers || "N/A"}</div>
          <div><strong>Characters:</strong> {movie.characters || "N/A"}</div>
          <div><strong>Concepts:</strong> {movie.concepts || "N/A"}</div>
          <div><strong>Teams:</strong> {movie.teams || "N/A"}</div>
          <div><strong>Things:</strong> {movie.things || "N/A"}</div>
          <div><strong>Locations:</strong> {movie.locations || "N/A"}</div>
          <div><strong>Site:</strong> {movie.site_detail_url || "N/A"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
