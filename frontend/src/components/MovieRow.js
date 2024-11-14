import React from "react";

function MovieRow({ item }) {
	return (
		//displays the movies with the movie name
		// add a button (?) so people can go see other info about the movie
		<li key={item.id}>{item.title}</li>
	);
}

export default MovieRow;
