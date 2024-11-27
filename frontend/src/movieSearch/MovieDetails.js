import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/useUser";

const url = process.env.REACT_APP_API_URL;

function MovieDetails({movieid, closeInfo}){
  const { user, isSignedIn } = useUser();
  const [dataa, setDataa] = useState(null)

  useEffect(()=>{
    movieData(movieid)
  }, [movieid])

  // gets specific movies data with the id
  const movieData = (movieid) => {
    axios
      .post(url + "/movie", {
        id: movieid
      })
      .then((response)=>{
        //console.log(response.data)
        setDataa(response.data)
      })
      .catch((error) => console.log(error));
  }

  const handleFavourite = () => {
    axios
      .post(url + "/user/remove-from-user-favourites", {
        movieid: movieid,
        email: user.email
      })
      .then((response) => {
        // if we try to remove a movie that isn't in our favourites result will be '[]'
        if (response.data.length === 0){
          //console.log("Not in favourites")
          axios
            .post(url + "/user/add-to-user-favourites", {
              movieid: movieid,
              email: user.email
            })
            .then((addresponse) => {
              //console.log(addresponse)
            })
            .catch((adderror) => {
              console.log(adderror)
            })
        } else {
          alert("Removed from favourites")
        }
      })
      .catch((error) => console.log(error))
  }

  return(
    <div className="details">
      { dataa 
      
      ?
      
      <article>
        <button onClick={closeInfo}>Close</button>
        {isSignedIn() 
        ?
        <button onClick={handleFavourite}>Add to favourites</button>
        : 
        <none/>
        }
        <section>
          <h2>{dataa.title}</h2> 
          <div>
            <h6>Release date: {dataa.release_date.length !== 0 ? dataa.release_date : "Not available"}</h6>
            <h6>Rating: {dataa.vote_count !== 0 ? dataa.vote_average : "Not available"}</h6>
            <h6>Runtime: {dataa.runtime} minutes</h6>
            <h6>Genres: {dataa.genres.length !== 0 ? dataa.genres.map((i) => i.name).join(", ") : "Not available"}</h6>
            </div>
          <p>{dataa.overview}</p>
        </section>
      </article>

      : 

      <p>Loading</p>}
    </div>
  )
}

export default MovieDetails;