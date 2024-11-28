import { pool } from "../helpers/db.js";

const selectUserFavourites = async (username) => {
  return await pool.query(
      `
      select Favourite.Favourite_id, Favourite.Movie_id , Favourite.MovieTitle
      from Favourite
      inner join Account on Account.Account_id=Favourite.Account_id
      where Account.Username=$1 
      `, [username]
  )
}

const removeFromFavourite = async (email, movieid) => {
  const accountID = await pool.query(
      `
      select Account_id
      from Account
      where Email=$1
      `, [email]
  )

  const trimmedAccountID = accountID.rows[0].account_id;

  return await pool.query(
      `
      delete from Favourite
      where Account_id=$1 and Movie_id=$2
      returning *
      `, [trimmedAccountID, movieid]
  )
}

const insertFavourite = async (email, movieid, movieTitle) => {
  const accountID = await pool.query(
      `
      select Account_id
      from Account
      where Email=$1
      `, [email]
  )

  const trimmedAccountID = accountID.rows[0].account_id;

  return await pool.query(
      `
      insert into Favourite (Movie_id, Account_id, MovieTitle)
      values ($1, $2, $3)
      returning *;
      `, [movieid, trimmedAccountID, movieTitle]
  )
}

export { insertFavourite, removeFromFavourite, selectUserFavourites}