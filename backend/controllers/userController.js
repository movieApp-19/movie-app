import { hash, compare } from "bcrypt";
import { insertUser, selectUserByEmail } from "../models/userModel.js";
import { ApiError } from "../helpers/ApiErrorClass.js"
import jwt from "jsonwebtoken";
const { sign } = jwt;

const postRegistration = async(req, res, next) => {
    try{
        if (!req.body.email || req.body.email.length === 0) return next(new ApiError("Invalid email for user", 400));
        if (!req.body.password || req.body.password.length === 0) return next(new ApiError("Invalid password for user", 400));
        if (!req.body.username || req.body.username.length === 0) return next(new ApiError("Invalid username for user", 400));

        const hashedPassword = await hash(req.body.password, 10);
        const userFromDb = await insertUser(req.body.username, req.body.email, hashedPassword);
        const user = userFromDb.rows[0];
        return res.status(201).json(createUserObject(user.id, user.username, user.email));
    } catch (error) {
        return next(error);
    }
}

const createUserObject = (id, username, email, token=undefined) => {
    return{
        "id": id,
        "username": username,
        "email": email,
        ...(token !== undefined) && {'token' : token}
    }
}

export { postRegistration };