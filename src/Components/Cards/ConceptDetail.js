import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ConceptDetail = () => {
  const { id } = useParams(); 
  const [concept, setConcept] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcept = async () => {
      try {
        const res = await fetch(`https://comicvinibackend.onrender.com/api/concept/${id}`);
        const data = await res.json();
        setConcept(data.results); 
      } catch (err) {
        console.error("Failed to fetch concept", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConcept();
  }, [id]);

  if (loading) {
    return <div className="container text-center text-warning py-5">Loading...</div>;
  }

  if (!concept) {
    return (
      <div className="container text-center text-warning py-5">
        <h2>Concept Not Found</h2>
        <Link to="/concepts" className="btn btn-warning mt-3">⬅ Back to Concepts</Link>
      </div>
    );
  }

  return (
    <div className="container bg-black text-white min-vh-100 py-4">
      <h2 className="text-warning mb-4">{concept.name}</h2>
      
      {concept.image?.medium_url && (
        <img
          src={concept.image.medium_url}
          alt={concept.name}
          className="img-fluid mb-4"
        />
      )}
      
      <p>{concept.deck || "No description available"}</p>

      <ul>
        <li><strong>First Appeared:</strong> {concept.first_appeared_in_issue?.name || "N/A"}</li>
        <li><strong>Start Year:</strong> {concept.start_year || "N/A"}</li>
        <li><strong>Issue Appearances:</strong> {concept.count_of_issue_appearances || 0}</li>
        <li><strong>Aliases:</strong> {concept.aliases || "N/A"}</li>
        <li><strong>Site Detail URL:</strong> 
          <a href={concept.site_detail_url} target="_blank" rel="noreferrer" className="text-info"> Visit ComicVine</a>
        </li>
      </ul>

      <Link to="/concepts" className="btn btn-warning mt-3">⬅ Back to Concepts</Link>
    </div>
  );
};

export default ConceptDetail;
