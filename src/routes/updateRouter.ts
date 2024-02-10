import { Router } from "express";

import * as update from "../middleware/update";

const updateRoute = Router();

updateRoute.get("/", update.getAllUpdates);

updateRoute.get("/:id", update.getSubjectUpdate);

export default updateRoute;
