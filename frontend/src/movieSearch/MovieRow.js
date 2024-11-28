import React from "react";

function MovieRow({ item, moreInfo }) {
	return (
		//displays the movies with the movie name
		<li key={item.id}>{item.title}
		<button className='moreButton' onClick={()=>moreInfo(item.id)}>More</button>
		</li>
	);
}

export default MovieRow;
