import React, { useState, useEffect, useRef } from 'react';
import './home.css';

export default function Home() {
  
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
    </div>
  );
}
