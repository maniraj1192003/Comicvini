

export default function SearchResultCard({ item }) {
  return (
    <div className="card bg-dark text-white border border-warning shadow-lg h-100">
      {item.image?.medium_url && (
        <img
          src={item.image.medium_url}
          alt={item.name}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title text-warning">{item.name}</h5>
        <p className="card-text">
          {item.deck || "No description available"}
        </p>
        
      </div>
    </div>
  );
}
