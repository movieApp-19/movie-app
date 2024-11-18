import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:8000";

function MovieDetails({movieid, closeInfo}){
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
        console.log(response.data)
        setDataa(response.data)
      })
      .catch((error) => console.log(error));
  }

  return(
    <div className="details">
      { dataa 
      
      ?
      
      <article>
        <button onClick={closeInfo}>Close</button>
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