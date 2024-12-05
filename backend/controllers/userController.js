import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUser, selectUserByUsername, deleteUser, selectUserByEmail, insertSession, deleteSession } from "../models/userModel.js";
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

const validatePassword = (password) => {
    if (password.length < 8 || !/[A-Z]+/.test(password) || !/[0-9]+/.test(password))
        return false;

    return true;
}

const postRegistration = async(req, res, next) => {
    const { username, email, password } = req.body;

    try{
        if (!email || email.length < 6)
            return next(new APIError(errors.INVALID_EMAIL, 400));
        if (!password || !validatePassword(password))
            return next(new APIError(errors.INVALID_PASSWORD, 400));
        if (!username || username.length === 0)
            return next(new APIError(errors.INVALID_USERNAME, 400));

        const hashedPassword = await hash(password, 10);
        const userFromDb = await insertUser(username, email, hashedPassword);
        const user = userFromDb.rows[0];
        return res.status(201).json(createUserObject(user.id, user.username, user.email));
    } catch (error) {
        return next(error);
    }
}

const postLogin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || username.length === 0)
            return next(new APIError(errors.INVALID_USERNAME, 400))
        if (!password || password.length === 0)
            return next(new APIError(errors.INVALID_PASSWORD, 400))

        const user = (await selectUserByUsername(username)).rows[0];
        if (!await compare(password, user.password))
            return next(new APIError(errors.INVALID_CREDENTIALS, 401));

        const token = sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 15 });
        await insertSession(username, token);

        return res.status(200).json(createUserObject(user.account_id, username, user.email, token));
    } catch (err) {
        return next(err);
    }
}

const deleteUserAccount = async (req, res, next) => {
    const { email } = req.body;

	try {
		// check if email exists in request
		if (!email || email.length === 0)
			return next(new APIError(errors.INVALID_EMAIL, 400));

		// check if email is in database
		const userFromDb = await selectUserByEmail(email)
		if (userFromDb.rowCount === 0)
			return next(new APIError(errors.INVALID_EMAIL_DATABASE, 404));
		
        // deletes the user
		await deleteUser(email)
		return res.status(201).json({ message: "User successfully deleted"});
	} catch (error) {
		return next(error)
	}
}

const postLogout = async (req, res, next) => {
    try {
        await deleteSession(req.headers.authorization)
        return res.status(200).json({ message: "User successfully logged out" });
    } catch (error) {
        return next(error);
    }
}

export { postRegistration, postLogin, deleteUserAccount, postLogout };
