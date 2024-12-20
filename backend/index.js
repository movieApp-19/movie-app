import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router as searchRouter } from "./routers/searchRouter.js";
import { router as movieRouter } from "./routers/movieRouter.js";
import { router as userRouter } from "./routers/userRouter.js";
import { router as reviewRouter } from "./routers/reviewRouter.js";
import { router as favouriteRouter } from "./routers/favouriteRouter.js"
import { router as fanPageRouter } from "./routers/fanPageRouter.js"
import { router as fanGroupRouter } from "./routers/fanGroupRouter.js"
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/search", searchRouter);
app.use("/movie", movieRouter);
app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/favourite", favouriteRouter)
app.use("/fangroups", fanPageRouter);
app.use("/fangroup", fanGroupRouter);


app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	if (process.env.NODE_ENV === "development")
		console.log("Middleware StatusCode:", statusCode, "Error:", err.message);
	
	res.status(statusCode).json({ error: err.message });
});

if (process.env.NODE_ENV === "development"){
	app.listen(port);
}

export default app
