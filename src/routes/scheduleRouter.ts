import { Router } from "express";
import * as schedule from "../middleware/schedule";
import { body } from "express-validator";
import { inputHandler } from "../handlers/inputHandler";

const scheduleRoute = Router();

scheduleRoute.get("/", schedule.getSchedules);

scheduleRoute.post(
  "/create",
  body("startTime").isInt({ min: 0, max: 23 }),
  body("endTime").isInt({ min: 0, max: 23 }),
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

scheduleRoute.get("/:day", schedule.getScheduleByDay);

export default scheduleRoute;
