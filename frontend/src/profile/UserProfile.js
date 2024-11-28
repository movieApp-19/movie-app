import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/useUser";
import MovieList from "../movieSearch/MovieList.js";

const url = process.env.REACT_APP_API_URL;

function UserProfile(){
  const [movies, setMovies] = useState([]);
  const { user } = useUser();

  useEffect(()=>{
    getFavourites()
  })

	const getFavourites = () => {
    axios
			.get(url + `/user/${user.username}/user-favourites`)
			.then((response) => {
				//console.log(response.data);
        const moviesDataShort = response.data.map((element) => {
          return { id: element.movie_id, title: element.movietitle };
        })
        setMovies(moviesDataShort)
			})
			.catch((error) => console.log(error));
	};

  return(
    <div>
      <h1>Your Profile</h1>
      <h2>Your favourites</h2>
			<MovieList movies={movies} getFavourites={getFavourites}/>
    </div>
  )
}

export default UserProfile