import axios from "axios";
import { useEffect, useState } from "react";
import MovieRow from "./components/MovieRow.js";
import ReactPaginate from "react-paginate";

function MovieSearch() {
	const [searchValue, setSearchValue] = useState("Finland");
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPagecount] = useState(0);

	useEffect(() => {
		searchSpecificMovie();
	}, [page]);

	const searchSpecificMovie = () => {
		axios
			.post("http://localhost:8001/search", {
				tmdbQuery: searchValue,
				page: page,
			})
			.then((response) => {
				console.log(response.data);
				//console.log(response.data.total_pages);
				// NOTE, ids from tmdb are ALWAYS unique, thats why we can use them as the unique key for list elements
				const moviesData = response.data.results.map((element) => {
					return { id: element.id, title: element.title };
				});

				//console.log(moviesData);
				setMovies(moviesData);
				setPagecount(response.data.total_pages);
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
							if (searchValue.length !== 0) {
								searchSpecificMovie();
							}
						}
					}}
				></input>
			</form>
			<ul>
				{movies.map((item) => {
					return <MovieRow key={item.id} item={item} />;
				})}
			</ul>
			<ReactPaginate
				containerClassName="page"
				breakLabel="..."
				nextLabel=">"
				onPageChange={(e) => setPage(e.selected + 1)}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</div>
	);
}

export default MovieSearch;
