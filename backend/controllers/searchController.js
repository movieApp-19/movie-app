import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const authorizationKey = process.env.TMDB_KEY;

const searchResults = async (req, res, next) => {
	// this is the query value that we will get from the frontend
	// tmdbQuery has been hardcoded as 'monkey' FOR TESTING PURPOSES
	// after testing tmdbQuery would be for example const tmdbQuery = req.body.tmdbQuery
	//const tmdbQuery = "monkey";
	const tmdbQuery = req.body.tmdbQuery;
	// other values would be OPTIONAL: year, include_adult, language
	// req.body.language
	const language = ""; // empty by default
	// req.body.year
	const year = ""; // example "1999";
	// req.body.popularity
	const popularityAorD = "desc"; // Defaults to popularity.desc

	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&year=${year}&with_original_language=${language}&with_text_query=${tmdbQuery}&page=1&sort_by=popularity.${popularityAorD}`,
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${authorizationKey}`,
		},
	};

	//const options = {
	//	method: "GET",
	//	url: `https://api.themoviedb.org/3/search/movie?query=${tmdbQuery}&include_adult=${include_adult}&language=${language}&page=1&year=${year}`,
	//	headers: {
	//		accept: "application/json",
	//		Authorization: `Bearer ${authorizationKey}`,
	//	},
	//};
	//
	try {
		// query can't be empty!
		if (!tmdbQuery) {
			const error = new Error("Query missing");
			error.statusCode = 400;
			return next(error);
		}
		const response = await axios.request(options);
		res.json(response.data);
	} catch (error) {
		return next(error);
	}
};

export { searchResults };
