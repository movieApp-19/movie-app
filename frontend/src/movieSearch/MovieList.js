import React, { useState } from "react";
import MovieDetails from "./MovieDetails";
import MovieRow from "./MovieRow";
import Backdrop from "../components/Backdrop";
import MovieReview from "./MovieReview.js";

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
                {
                getFavourites && movies.length === 0 
                ?
                <h3>No favourites</h3>
                :
                movies.map((item) => {
                    return <MovieRow key={item.id} item={item} moreInfo={moreInfo}/>;
                })
                }
            </ul>
            { detailsIsOpen ? <div id="movie-container">
                <MovieDetails movieid={movieid} closeInfo={closeInfo} getFavourites={getFavourites}/>
                <MovieReview movieId={movieid}/> 
            </div>: null}
            { detailsIsOpen ? <Backdrop closeInfo={closeInfo}/> : null}
        </div>
    )
}

export default MovieList