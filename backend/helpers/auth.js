import jwt from "jsonwebtoken";
import errors from "./errorStrings.js";
import { selectSession } from "../models/userModel.js";
import { APIError } from "./APIError.js";

const auth = async (req, res, next) => {
    if (!req.headers.authorization)
        return next(new APIError(errors.AUTH_REQUIRED, 401));

    const token = req.headers.authorization?.split(" ")[1];
    let u = undefined;

    try {
        try {
            u = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            return next(new APIError(errors.AUTH_REQUIRED, 401));
        }

        if (!u.username || !u.id || !u.exp)
            return next(new APIError(errors.AUTH_REQUIRED, 401));

        // Must have a valid session
        const sessions = (await selectSession(token))?.rows;
        if (sessions.length === 0)
            return next(new APIError(errors.AUTH_REQUIRED, 401));

        res.locals.username = u.username;
        res.locals.id = u.id;
        res.locals.token = token;
        return next();
    } catch (error) {
        return next(error);
    }
}

export { auth }
