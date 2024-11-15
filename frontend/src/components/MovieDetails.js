import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:8000";

function MovieDetails({movieid}){
  const [dataa, setDataa] = useState(null)

  useEffect(()=>{
    movieData(movieid)
  }, [movieid])

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
    <div>
      { dataa ?
      
      <article>
        <section>
          <h2>{dataa.title}</h2> 
          <div>
            <h6>Release date: {dataa.release_date}</h6>
            <h6>Rating: {dataa.vote_average}</h6>
            <h6>Runtime: {dataa.runtime} minutes</h6>
            <h6>Genres: {dataa.genres.map((i) => i.name).join(", ")}</h6>
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