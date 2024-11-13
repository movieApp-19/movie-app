import axios from "axios";
import { useState } from "react";

function MovieSearch() {
	const [searchValue, setSearchValue] = useState("");

	const searchSpecificMovie = () => {
		axios
			.post("http://localhost:8001/search", { tmdbQuery: searchValue })
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="App">
			<h3>TEST</h3>
			<button onClick={() => searchSpecificMovie()}>Monkey</button>
			{/* This is what we actually want... a searchbar*/}
			<form>
				<input
					type="text"
					value={searchValue}
					// e means event
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							console.log("enter");
							searchSpecificMovie();
						}
					}}
				></input>
			</form>
		</div>
	);
}

export default MovieSearch;
