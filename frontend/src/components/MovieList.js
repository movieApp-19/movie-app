import React, { useState } from "react";
import MovieDetails from "./MovieDetails";
import MovieRow from "./MovieRow";

function MovieList({movies}) {
  const [detailsIsOpen, setDetailsIsOpen] = useState(false)
  const [movieid, setMovieid] = useState()

  function moreInfo(id){
    setMovieid(id)
    setDetailsIsOpen(true)
  }

  return (
    <div>
      <ul>
        {movies.map((item) => {
					return <MovieRow key={item.id} item={item} moreInfo={moreInfo}/>;
				})}
      </ul>
      { detailsIsOpen ? <MovieDetails movieid={movieid}/> : null}
    </div>
  )
}

export default MovieList