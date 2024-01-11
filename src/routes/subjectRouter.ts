import { Router } from "express";
import { body } from "express-validator";
import {
	createSubject,
	deleteSubject,
	getAllSubject,
	getOneSubject,
	markAttendance,
	updateAttendence,
	updateSubject,
} from "../middleware/subject";
import { createUpdate } from "../middleware/update";
import { inputHandler } from "../handlers/inputHandler";
import subjectExistOrNot from "../handlers/subjectExistanceHandler";

const subjectRoute = Router();

subjectRoute.get("/", getAllSubject);

subjectRoute.get("/:id", subjectExistOrNot, getOneSubject);

subjectRoute.post(
	"/create",
	body("name").isString(),
	body("subjectCode").isString(),
	inputHandler,
	createSubject
);

subjectRoute.post(
	"/markAttendance/:id",
	body("isAttended").isBoolean(),
	inputHandler,
	subjectExistOrNot,
	markAttendance,
	createUpdate
);

subjectRoute.put(
	"/update/:id",
	body("name").isString(),
	body("subjectCode").isString(),
	body("totalClasses").isInt(),
	body("attendedClasses").isInt(),
	inputHandler,
	subjectExistOrNot,
	updateSubject
);

subjectRoute.delete("/delete/:id", subjectExistOrNot, deleteSubject);

subjectRoute.use((err, req, res, next) => {
	res.status(400).json({ message: "error in subject route" });
});

export default subjectRoute;
