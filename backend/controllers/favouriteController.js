import { selectUserByEmail } from "../models/userModel.js";
import { selectUserFavourites, insertFavourite, removeFromFavourite } from "../models/favouriteModel.js"
import { APIError } from "../helpers/APIError.js"
import errors from "../helpers/errorStrings.js"

const userFavourites = async(req,res,next) => {
  try {
      if (!req.params.username || req.params.username === 0)
          return next(new APIError(errors.INVALID_USERNAME, 400))
      const result = await selectUserFavourites(req.params.username)
      return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const addUserFavourite = async(req,res,next) => {
  try {
      if (!req.body.email || req.body.email.length === 0)
          return next(new APIError(errors.INVALID_EMAIL, 400))
      if (!req.body.movieid || req.body.movieid.length === 0)
          return next(new APIError(errors.INVALID_MOVIEID, 400))
      const userFromDb = await selectUserByEmail(req.body.email)
  if (userFromDb.rowCount === 0)
    return next(new APIError(errors.INVALID_EMAIL_DATABASE, 400));
      const result = await insertFavourite(req.body.email, req.body.movieid, req.body.movieTitle)
      return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const removeFromUserFavourite = async(req,res,next) => {
  try {
      if (!req.body.email || req.body.email.length === 0)
          return next(new APIError(errors.INVALID_EMAIL, 400))
      if (!req.body.movieid || req.body.movieid.length === 0)
          return next(new APIError(errors.INVALID_MOVIEID, 400))
      const userFromDb = await selectUserByEmail(req.body.email)
  if (userFromDb.rowCount === 0)
    return next(new APIError(errors.INVALID_EMAIL_DATABASE, 400));
      const result = await removeFromFavourite(req.body.email, req.body.movieid)
      return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

export { removeFromUserFavourite, addUserFavourite, userFavourites }