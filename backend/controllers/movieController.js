import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const authorizationKey = process.env.TMDB_KEY;

const movieResult = async (req, res, next) => {
	const id = req.body.id;

	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${authorizationKey}`,
		},
	};

	try {
		// there needs to be an id!
		if (!id) {
			const error = new Error("id missing");
			error.statusCode = 400;
			return next(error);
		}
		// id has to be a number
		if (isNaN(id)){
			const error = new Error("id not a number")
			error.statusCode = 400
			return next(error)
		}
		const response = await axios.request(options);
		res.json(response.data);
	} catch (error) {
		return next(error);
	}
};

export { movieResult };
