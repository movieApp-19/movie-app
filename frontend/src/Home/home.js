import React from 'react'
import './home.css';

export default function home() {
  return (
    <div className='test'>
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Showtimes</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Search Movies</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="#">Favorites list</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="#">Add here</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="#">notFound</a>
  </li>
</ul>
    </div>
  )
}
