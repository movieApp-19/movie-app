import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const authorizationKey = process.env.TMDB_KEY;

const searchResults = async (req, res, next) => {
	// this is the value that we will get from the frontend
	const tmdbQuery = req.body.tmdbQuery;
	// page value
	const page = req.body.page;
	// other values are OPTIONAL: language, year, popularity (ascending or descending)
	const language = req.body.language; // tmdb: with_original_language -> the language the movie was originally released as
	const year = req.body.year; // example "1999";
	const orderBy = req.body.orderBy; // Defaults to String popularity.desc

	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&year=${year}&with_original_language=${language}&with_text_query=${tmdbQuery}&page=${page}&sort_by=${orderBy}`,
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${authorizationKey}`,
		},
	};

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
