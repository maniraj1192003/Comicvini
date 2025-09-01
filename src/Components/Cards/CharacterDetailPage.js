import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
      
        
const response = await axios.get(`https://comicvinibackend.onrender.com/api/character/4005-${id}`);
setCharacter(response.data.results);

      } catch (error) {
        console.error("Error fetching character details:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="text-center text-warning mt-5">Loading character details...</div>;
  }

  if (!character) {
    return <div className="text-center text-danger mt-5">Character not found.</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning text-center mb-4" style={{ fontFamily: "'Comic Sans MS', cursive", textShadow: "2px 2px red" }}>
        🦸 {character.name} 🦸
      </h2>

      <div className="card bg-dark text-white border border-warning shadow-lg">
        {character.image?.medium_url && (
          <img
            src={character.image.medium_url}
            alt={character.name}
            className="card-img-top"
            style={{ height: "400px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title text-warning">{character.real_name || character.name}</h5>
          <p className="card-text">{character.deck || "No summary available."}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin?.name}</p>
          <p><strong>Publisher:</strong> {character.publisher?.name}</p>
          <p><strong>First Appearance:</strong> {character.first_appeared_in_issue?.name}</p>
          <p><strong>Issue Appearances:</strong> {character.count_of_issue_appearances}</p>
          <div dangerouslySetInnerHTML={{ __html: character.description }} />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;