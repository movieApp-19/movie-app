import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUser, selectUserByUsername } from "../models/userModel.js";
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

export { postRegistration, postLogin };
