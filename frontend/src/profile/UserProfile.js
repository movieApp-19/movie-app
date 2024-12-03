import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/useUser";
import MovieList from "../movieSearch/MovieList.js";

const urlbackend = process.env.REACT_APP_API_URL;
const url = process.env.REACT_APP_URL;

function UserProfile(){
  const [movies, setMovies] = useState([]);
  const { user } = useUser();

  useEffect(()=>{
    getFavourites()
  })

	const getFavourites = () => {
    axios
			.get(urlbackend + `/favourite/${user.username}`)
			.then((response) => {
				//console.log(response.data);
        const moviesDataShort = response.data.map((element) => {
          return { id: element.movie_id, title: element.movietitle };
        })
        setMovies(moviesDataShort)
			})
			.catch((error) => console.log(error));
	};

 const shareLink = async () => {
    await navigator.clipboard.writeText(url + `/favourites/${user.username}`)
  }

  return(
    <div>
      <h1>Your Profile</h1>
      <h2>Favourites</h2>
      <button onClick={shareLink}>Copy Link</button>
			<MovieList movies={movies} getFavourites={getFavourites}/>
    </div>
  )
}

export default UserProfile