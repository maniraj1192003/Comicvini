import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const PowersPage = () => {
  const [powers, setPowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(""); 
  const navigate = useNavigate(); 

  const fetchPowers = async (filterValue = "") => {
    try {
      setLoading(true);
      const query = filterValue ? `?name=${filterValue}` : "";
      const res = await fetch(`https://comicvinibackend.onrender.com/api/powers${query}`);
      const data = await res.json();
      setPowers(data.results || []);
    } catch (error) {
      console.error("Error fetching powers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPowers();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchPowers(filter);
  };

  if (loading) return <p className="text-white text-center">Loading powers...</p>;
  if (!powers.length) return <p className="text-white text-center">No powers found.</p>;

  return (
    <div className="bg-black min-vh-100 py-4"> 
      <div className="container">
      
      <button className="btn btn-outline-warning" onClick={() => navigate(-1)}>← Back</button>


        <h2 className="text-warning text-center mb-4">⚡ Superpowers</h2>

        <form onSubmit={handleFilterSubmit} className="mb-4 text-center">
          <input
            type="text"
            placeholder="Filter by power name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control d-inline-block w-auto"
          />
          <button type="submit" className="btn btn-warning ms-2">
            Filter
          </button>
        </form>

        <div className="row">
          {powers.map((power) => (
            <div className="col-md-4 mb-4" key={power.id}>
              <div className="card bg-dark text-white border border-warning shadow-lg h-100">
                <div className="card-body">
                  <h5 className="card-title text-warning">{power.name}</h5>
                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html: power.description || "No description available",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PowersPage;
