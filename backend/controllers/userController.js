import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { removeFromFavourite, insertFavourite, selectUserFavourites, insertUser, selectUserByUsername, deleteUser, selectUserByEmail } from "../models/userModel.js";
import { APIError } from "../helpers/APIError.js"
import errors from "../helpers/errorStrings.js"

const { sign } = jwt;

const createUserObject = (id, username, email, token=undefined) => {
    return{
        "id": id,
        "username": username,
        "email": email,
        ...(token !== undefined) && {'token' : token}
    }
}

const postRegistration = async(req, res, next) => {
    try{
        if (!req.body.email || req.body.email.length < 6)
            return next(new APIError(errors.INVALID_EMAIL, 400));
        if (!req.body.password || req.body.password.length < 8)
            return next(new APIError(errors.INVALID_PASSWORD, 400));
        if (!req.body.username || req.body.username.length === 0)
            return next(new APIError(errors.INVALID_USERNAME, 400));

        const hashedPassword = await hash(req.body.password, 10);
        const userFromDb = await insertUser(req.body.username, req.body.email, hashedPassword);
        const user = userFromDb.rows[0];
        return res.status(201).json(createUserObject(user.id, user.username, user.email));
    } catch (error) {
        return next(error);
    }
}

const postLogin = async (req, res, next) => {
    try {
        const user = (await selectUserByUsername(req.body.username)).rows[0];
        if (!await compare(req.body.password, user.password))
            return next(new APIError(errors.INVALID_CREDENTIALS, 401));

        const token = sign(req.body.username, process.env.JWT_SECRET_KEY);
        return res.status(200).json(createUserObject(user.account_id, user.username, user.email, token));
    } catch (err) {
        return next(err);
    }
}

const deleteUserAccount = async (req, res, next) => {
	try {
		// check if email exists in request
		if (!req.body.email || req.body.email.length === 0)
			return next(new APIError(errors.INVALID_EMAIL, 400));
		// check if email is in database
		const userFromDb = await selectUserByEmail(req.body.email)
		if (userFromDb.rowCount === 0)
			return next(new APIError(errors.INVALID_EMAIL_DATABASE, 400));
		// deletes the user
		await deleteUser(req.body.email)
		return res.status(201).json({ message: "User successfully deleted"});
	} catch (error) {
		return next(error)
	}
} 

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

export { removeFromUserFavourite, addUserFavourite, userFavourites, postRegistration, postLogin, deleteUserAccount };
