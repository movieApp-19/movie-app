import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../movieSearch/MovieList.js";

const url = process.env.REACT_APP_API_URL;

const Favourites = () => {
  const { userid } = useParams()
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    getFavourites()
  }, [userid])

  const getFavourites = () => {
    axios
      .get(url + `/favourite/${userid}`)
      .then((response) => {
        const moviesDataShort = response.data.map((element) => {
          //console.log(element.movie_id)
          return { id: element.movie_id, title: element.movietitle };
        })
        setMovies(moviesDataShort)
			})
			.catch((error) => console.log(error));
  }

  return(
    <div>
      <h3>Favourites of {userid}</h3>
      <MovieList movies={movies} getFavourites={getFavourites}/>
    </div>
  )
}

export default Favourites