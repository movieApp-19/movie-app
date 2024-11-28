import React, { useState } from "react";
import MovieDetails from "./MovieDetails";
import MovieRow from "./MovieRow";
import Backdrop from "../components/Backdrop";

function MovieList({movies, getFavourites}) {
  const [detailsIsOpen, setDetailsIsOpen] = useState(false)
  const [movieid, setMovieid] = useState()

  function moreInfo(id){
    setMovieid(id)
    setDetailsIsOpen(true)
  }

  function closeInfo(){
    setDetailsIsOpen(false)
  }

  return (
    <div>
      <ul>
        {movies.map((item) => {
					return <MovieRow key={item.id} item={item} moreInfo={moreInfo}/>;
				})}
      </ul>
      { detailsIsOpen ? <MovieDetails movieid={movieid} closeInfo={closeInfo} getFavourites={getFavourites}/> : null}
      { detailsIsOpen ? <Backdrop closeInfo={closeInfo}/> : null}
    </div>
  )
}

export default MovieList