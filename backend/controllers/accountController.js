import { selectAccountByEmail, deleteAccount } from ".models/user.js"

// ! CHANGE ERROR TO API ERROR WHEN APIERROR.js IS ADDED

const deleteUserAccount = async (req, res, next) => {
	try {
		// check if email exists in request
		if (!req.body.email || req.body.email.length === 0 || !req.body.password)
			return next(new Error("Invalid credentials for user", 400));
		// check if email is in database
		const userFromDb = await selectAccountByEmail(req.body.email)
		if (userFromDb.rowCount === 0)
			return next(new Error("Email doesn't exist in database", 400));
		// deletes the user
		const result = await deleteAccount(req.body.email, req.body.password)
		// We already checked if account exists so this should be password error
		if (result.rowCount === 0)
			return next(new Error("Password is wrong", 400));
		return res.status(201).json({ message: "User successfully deleted"});
	} catch (error) {
		return next(error)
	}
} 

export { deleteUserAccount }
