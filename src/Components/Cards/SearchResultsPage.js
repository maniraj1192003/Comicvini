import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchResultCard from "./SearchResultCard";

export default function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const resources =
    queryParams.get("resources") || "character,movie,power,concept";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/search?query=${encodeURIComponent(
            query
          )}&resources=${resources}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query, resources]);

  if (loading)
    return (
      <div className="min-vh-100 bg-black d-flex justify-content-center align-items-center">
        <p className="text-warning">Loading...</p>
      </div>
    );

  if (!results.length)
    return (
      <div className="min-vh-100 bg-black d-flex justify-content-center align-items-center">
        <p className="text-danger">No results found for "{query}"</p>
      </div>
    );

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{ backgroundColor: "black" }}
    >
      <h2 className="text-warning text-center mb-4">
        Search Results for "{query}"
      </h2>
      <div className="row">
        {results.map((item) => (
          <div className="col-md-4 mb-4" key={item.id || item.guid}>
            <SearchResultCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
