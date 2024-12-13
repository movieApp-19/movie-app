import React, { useState, useEffect } from 'react';
import './home.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrendingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
      }
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const tenMovies = data.results.slice(0, 10);
      setMovies(tenMovies);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsLoading(false); 
    }
  };

  // Get movies when the page is loaded
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our Movie App!</h1>
        <p>Explore showtimes, search for movies, and manage your account easily.</p>
      </header>

      <section className="home-content">
        <h2>Features:</h2>
        <ul>
          <li>View movie showtimes at your local theaters</li>
          <li>Search for movies by title, rating, and more</li>
          <li>more</li>
        </ul>
      </section>

      <div className="trending-movies">
        <h3>Trending Movies:</h3>
        {isLoading ? (
          <p>Loading movies...</p>
        ) : (
          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.id} >
                  <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank" 
                rel="noopener noreferrer" 
              >
                <img className="trending-movie"
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Image+Available'}
                alt={movie.title}
              />
              </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
