import axios from "axios";
import { useEffect, useState } from "react";
import MovieRow from "./components/MovieRow.js";
import ReactPaginate from "react-paginate";
import "./search.css";

const url = "http://localhost:8000";

function SearchUI() {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPagecount] = useState(0);
	// search and filters
	const [searchValue, setSearchValue] = useState("");
	const [sortPopularity, setSortPopularity] = useState("desc");
	const [language, setLanguage] = useState("");
	const [selectYear, setSelectYear] = useState("");
	const [customYear, setCustomYear] = useState("");

	useEffect(() => {
		searchSpecificMovie();
	}, [page]);

	const searchSpecificMovie = () => {
		axios
			.post(url + "/search", {
				tmdbQuery: searchValue,
				page: page,
				year: customYear,
				popularity: sortPopularity,
				language: language,
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

	// Updating the selected year

	const handleYear = (e) => {
		setSelectYear(e.target.value);
		setCustomYear(""); // Reset custom year
	};

	const handleCustomYear = (e) => {
		setCustomYear(e.target.value);
	};

	return (
		<div>
			<form>
				<input
					type="text"
					value={searchValue}
                    placeholder="Movie name..."
					// e means event
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							if (searchValue.length !== 0) {
								setPage(1);
								searchSpecificMovie();
							}
						}
					}}
				></input>
				<label htmlFor="year">
					Release year
					<select
						id="year"
						name="year"
						value={selectYear}
						onChange={handleYear}
					>
						<option value="blank"></option>
						<option value="1990s">1990s</option>
						<option value="2000">2000s</option>
						<option value="2010s">2010s</option>
						<option value="custom">Type exact year</option>
					</select>
				</label>

				{selectYear === "custom" && (
					<input
						type="number"
						name="customYear"
						id="customYear"
						placeholder="Enter exact year here"
						value={customYear}
						onChange={handleCustomYear}
					/>
				)}

				<label htmlFor="language">
					Original language
					<select
						id="country"
						name="country"
						onChange={(e) => setLanguage(e.target.value)}
					>
						<option value=""></option>
						<option value="en">English</option>
						<option value="es">Spanish</option>
						<option value="de">German</option>
						<option value="ty">French</option>
						<option value="fi">Finnish</option>
						<option value="zh">Chinese</option>
						<option value="ja">Japanese</option>
					</select>
				</label>

				<label htmlFor="Sort by">
					Sort by
					<select
						id="sortBy"
						name="sortBy"
						onChange={(e) => setSortPopularity(e.target.value)}
					>
						{/*NOTE: default value is always descending. Maybe add more filters? */}
						<option value=""></option>
						<option value="desc">Popularity descending</option>
						<option value="asc">Popularity ascending</option>
					</select>
				</label>
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
				forcePage={page - 1}
			/>
		</div>
	);
}

export default SearchUI;
