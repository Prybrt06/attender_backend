import { Router } from "express";
import * as schedule from "../middleware/schedule";
import { body } from "express-validator";
import { inputHandler } from "../handlers/inputHandler";

const scheduleRoute = Router();

scheduleRoute.get("/", schedule.getSchedules);

scheduleRoute.post(
	"/create",
	body("day").isIn([
		"MONDAY",
		"TUESDAY",
		"WEDNESDAY",
		"THURSDAY",
		"FRIDAY",
		"SATURDAY",
		"SUNDAY",
	]),
	body("subjectName").isString(),
	body("subjectCode").isString(),
	inputHandler,
	schedule.createSchedule
);

export default scheduleRoute;
