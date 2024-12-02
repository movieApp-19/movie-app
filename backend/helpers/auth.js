import jwt from "jsonwebtoken";
import errors from "./errorStrings.js";

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        res.status(401).json({ message: errors.AUTH_REQUIRED });
    } else {
        try {
            const p = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (!p.username || !p.exp)
                throw Error;

            next();
        } catch (error) {
            res.status(403).json({ message: errors.INVALID_CREDENTIALS });
        }
    }
}

export { auth }
