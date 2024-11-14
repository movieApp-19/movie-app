import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router as searchRouter } from "./routers/searchRouter.js";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/search", searchRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.log("Middleware StatusCode:", statusCode); // Log for debugging
	res.status(statusCode).json({ error: err.message });
});

app.listen(port);
