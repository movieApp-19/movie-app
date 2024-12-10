import jwt from "jsonwebtoken";
import errors from "./errorStrings.js";
import { selectSession } from "../models/userModel.js";
import { APIError } from "./APIError.js";

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token)
        return next(new APIError(errors.AUTH_REQUIRED, 401));

    try {
        const p = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!p.username || !p.exp)
            return next(new APIError(errors.AUTH_REQUIRED, 401));

        // Must have a valid session
        const sessions = (await selectSession(req.headers.authorization))?.rows;
        if (sessions.length === 0)
            return next(new APIError(errors.AUTH_REQUIRED, 401));

        res.locals.username = p.username;
        res.locals.id = p.id;
        res.locals.token = req.headers.authorization;
        return next();
    } catch (error) {
        return next(error);
    }
}

export { auth }
