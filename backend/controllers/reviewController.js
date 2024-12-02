import { insertReview, browseReview } from "../models/reviewModel.js"
import { APIError } from "../helpers/APIError.js"
import errors from "../helpers/errorStrings.js"

const postReview = async (req, res, next) => {
    const { id, stars, text, user, token } = req.body;

    try {
        if (!id)
            return next(new APIError(errors.INVALID_PARAMETERS, 400));
        if (!stars || stars < 1 || stars > 5)
            return next(new APIError(errors.INVALID_PARAMETERS, 400));

        // todo: Verify token
        if (!user || !token)
            return next(new APIError(errors.INVALID_PARAMETERS, 400));

        const result = await insertReview(id, stars, text, user);
        return res.status(200).json({ id: result.rows[0].review_id });
    } catch (error) {
        return next(error);
    }
}

const browseReviewController = async(req, res, next) => {
    const {id} = req.query;

    try{
        if (!id)
            return next(new APIError(errors.INVALID_PARAMETERS, 400));

        const result = await browseReview(id);
        if (result.rows.length === 0)
            return res.status(404).json({message: "No reviews yet."});

        return res.status(200).json({reviews: result.rows })

    } catch (error) {
        return next(error);
    }
}

export { postReview, browseReviewController }
