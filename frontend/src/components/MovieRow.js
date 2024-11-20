import React from "react";

function MovieRow({ item, moreInfo }) {
	return (
		//displays the movies with the movie name
		// add a button (?) so people can go see other info about the movie
		<li key={item.id}>{item.title}
		<button className='moreButton' onClick={()=>moreInfo(item.id)}>More</button>
		</li>
	);
}

export default MovieRow;
