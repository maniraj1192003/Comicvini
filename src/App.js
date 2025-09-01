import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./Components/Cards/MoviesPage";
import CharacterPage from "./Components/Cards/CharacterPage";
import CharacterDetailPage from "./Components/Cards/CharacterDetailPage";
import MovieDetail from "./Components/singlecard/MovieDetail";
import PowersPage from "./Components/Cards/PowersPage";
import ConceptsPage from "./Components/Cards/CoceptsPage";
import ConceptDetail from "./Components/Cards/ConceptDetail";
import SearchResultsPage from "./Components/Cards/SearchResultsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/characters" element={<CharacterPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/powers" element={<PowersPage />} />
        <Route path="/concepts" element={<ConceptsPage />} />
        <Route path="/concept/:id" element={<ConceptDetail />} />

        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
