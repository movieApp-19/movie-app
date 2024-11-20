const deleteAccount = async(email, hashedPassword) => {
	return await pool.query(
		"delete from account where email=$1 and password=$2", [email, hashedPassword]
	)
}

const selectAccountByEmail = async (email) => {
	return await pool.query("select * from account where email=$1", [email]);
};

export { selectAccountByEmail, deleteAccount }