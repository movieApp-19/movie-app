import axios from "axios";
import { useState } from "react";
import MovieRow from "./components/MovieRow.js";

function MovieSearch() {
	const [searchValue, setSearchValue] = useState("");
	const [movies, setMovies] = useState([]);

	const searchSpecificMovie = () => {
		axios
			.post("http://localhost:8001/search", { tmdbQuery: searchValue })
			.then((response) => {
				console.log(response.data);
				// NOTE, ids from tmdb are ALWAYS unique, thats why we can use them as the unique key for list elements
				const moviesData = response.data.results.map((element) => {
					return { id: element.id, title: element.title };
				});

				//console.log(moviesData);
				setMovies(moviesData);
			})
			.catch((error) => console.log(error));
	};

	return (
		// change className later
		<div className="App">
			<h3>Movie search test</h3>
			<form>
				<input
					type="text"
					value={searchValue}
					// e means event
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							searchSpecificMovie();
						}
					}}
				></input>
			</form>
			<ul>
				{movies.map((item) => {
					return <MovieRow key={item.id} item={item} />;
				})}
			</ul>
		</div>
	);
}

export default MovieSearch;
