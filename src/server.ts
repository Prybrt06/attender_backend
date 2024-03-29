import express from "express";
import morgan from "morgan";
import cors from "cors";

import subjectRoute from "./routes/subjectRouter";

import { protect } from "./modules/auth";
import { createNewUser, signin } from "./middleware/user";
import { body } from "express-validator";
import { inputHandler } from "./handlers/inputHandler";
import scheduleRoute from "./routes/scheduleRouter";
import updateRoute from "./routes/updateRouter";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).json({ message: "working fine" });
});

app.use("/subject", protect, subjectRoute);

app.use("/schedule", protect, scheduleRoute);

app.use("/update", protect, updateRoute)

app.post(
	"/user",
	body("username").isString(),
	body("mail").isString(),
	body("password").isString(),
	inputHandler,
	createNewUser
);

app.post(
	"/signin",
	body("username").isString(),
	body("password").isString(),
	inputHandler,
	signin
);

app.use((err, req, res, next) => {
	if (err.type == "auth") {
		res.status(400).json({ message: "error in authentication" });
	} else if (err.type == "input") {
		res.status(400).json({
			message: "invalid input or username already used",
		});
	} else if (err.type == "schedule") {
		res.status(400).json({ message: "error in creating schedule" });
	} else {
		res.status(400).json({ message: "There is an error" });
	}
});

export default app;
