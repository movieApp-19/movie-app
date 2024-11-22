import { ApiError } from "../helpers/ApiErrorClass.js";
import { selectAccountByEmail, deleteAccount } from "../models/user.js"
//import bcrypt from "bcrypt"

// ! CHANGE ERROR TO API ERROR WHEN APIERROR.js IS ADDED

const deleteUserAccount = async (req, res, next) => {
	try {
		// check if email exists in request
		if (!req.body.email || req.body.email.length === 0 || !req.body.password)
			//console.log(req.body.email, req.body.password)
			return next(new ApiError("Invalid credentials for user", 400));
		// check if email is in database
		const userFromDb = await selectAccountByEmail(req.body.email)
		//const passwordMatch = await bcrypt.compare(req.body.password, userFromDb.rows[0].password);
		if (userFromDb.rowCount === 0)
			return next(new ApiError("Email doesn't exist in database", 400));
		// deletes the user
		const result = await deleteAccount(req.body.email, req.body.password)
		// We already checked if account exists so this should be password error
		if (result.rowCount === 0)
			return next(new ApiError("Password is wrong", 400));
		return res.status(201).json({ message: "User successfully deleted"});
	} catch (error) {
		return next(error)
	}
} 

export { deleteUserAccount }
