import React, { useState } from "react";
import MovieDetails from "./MovieDetails";
import MovieRow from "./MovieRow";
import Backdrop from "../components/Backdrop";
import MovieReview from "./MovieReview.js";
import { useUser } from "../context/useUser.js";

function MovieList({movies}) {
    const [detailsIsOpen, setDetailsIsOpen] = useState(false)
    const [movieid, setMovieid] = useState()
    const { isSignedIn } = useUser();

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
            { detailsIsOpen ? <div id="movie-container">
                <MovieDetails movieid={movieid} closeInfo={closeInfo}/>
                { isSignedIn() ? <MovieReview movieId={movieid}/> : null }
            </div>: null}
            { detailsIsOpen ? <Backdrop closeInfo={closeInfo}/> : null}
        </div>
    )
}

export default MovieList