import {useEffect} from "react";
import "./assets/App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";
import { useState } from "react";
// edf87b2a 

const API_URL = 'http://www.omdbapi.com?apikey=edf87b2a';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title} `);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("avengers");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1 aria-label="MovieLand" tabIndex={0}>
        MovieLand
      </h1>

      <div aria-label="search for movies" tabIndex={0} className="search">
        <input
          placeholder="Search for a movies..."
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <img
          aria-label="click to search for movies"
          tabIndex={0}
          src={SearchIcon}
          alt="search-icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;