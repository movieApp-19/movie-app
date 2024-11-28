import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import MovieList from "./MovieList.js";
import "./search.css";
import "./movieDetails.css"
import "../components/backdrop.css"
import "./page.css"

const url = process.env.REACT_APP_API_URL;

function SearchUI() {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPagecount] = useState(0);
	// search and filters
	const [searchValue, setSearchValue] = useState("");
	const [sortFilter, setSortFilter] = useState("");
	const [language, setLanguage] = useState("");
	const [selectYear, setSelectYear] = useState("");
	const [customYear, setCustomYear] = useState("");

	const searchSpecificMovie = useCallback(() => {
		axios
			.post(url + "/search", {
				tmdbQuery: searchValue,
				page: page,
				year: customYear,
				orderBy: sortFilter,
				language: language,
			})
			.then((response) => {
				//console.log(response.data);
				if (response.data.results.length === 0){
					handlePages()
					throw new Error("Unable to load page");
				}
				console.log(response.data.total_pages)
				// 500 is the maximum amount of pages allowed by the tmdb API
				if (response.data.total_pages > 500){
					setPagecount(500)
				} 
				else setPagecount(response.data.total_pages);
				//console.log(response.data.total_pages);
				// NOTE, ids from tmdb are ALWAYS unique, thats why we can use them as the unique key for list elements
				const moviesDataShort = response.data.results.map((element) => {
					return { id: element.id, title: element.title };
				});
				//console.log(moviesData);
				setMovies(moviesDataShort);
			})
			.catch((error) => console.log(error));
	},[page, sortFilter, language, customYear, searchValue]);
	
	const handlePages = () => {
		setMovies([])
		setPagecount(0)
	}

	// we use timer here because if the user deletes his search fast, the movies will still be seen in the list. timer prevents this
	useEffect(() => {
		const timer = setTimeout(()=>{
			if (searchValue.trim().length === 0){
				handlePages()
			}
			else {
				searchSpecificMovie();
			}
		}, 100)
		return () => clearTimeout(timer)
	}, [searchValue, searchSpecificMovie]);

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
					placeholder="Type movie name"
					// e means event
					onChange={(e) => {
						setSearchValue(e.target.value)
						if (searchValue.length !== 0) {
							setPage(1);
						}
					}
					}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}
				></input>
				<label htmlFor="year">
					Release year
					<select
						id="year"
						name="year"
						value={selectYear}
						onChange={(e)=>{
							setPage(1)
							handleYear(e)
						}}
					>
						<option value="blank"></option>
						<option value="custom">Type exact year</option>
					</select>
				</label>

				{selectYear === "custom" && (
					<input
						type="number"
						name="customYear"
						id="customYear"
						placeholder="Enter year"
						value={customYear}
						onChange={(e) => {
							setPage(1)
							handleCustomYear(e)
						}}
					/>
				)}

				<label htmlFor="language">
					Original language
					<select
						id="country"
						name="country"
						onChange={(e) => {
								setPage(1)
								setLanguage(e.target.value)
						}}
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
						onChange={(e) => {
							setPage(1)
							setSortFilter(e.target.value)
						}}
					>
						<option value="popularity.desc">Popularity High</option>
						<option value="popularity.asc">Popularity Low</option>
						<option value="vote_average.desc">Rating High</option>
						<option value="vote_average.asc">Rating Low</option>
					</select>
				</label>
			</form>
			<MovieList movies={movies}/>
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
