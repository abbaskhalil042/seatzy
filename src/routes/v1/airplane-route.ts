import { Router } from "express";
import {
  createAirplaneController,
  getAirplaneController,
  getAllAirplaneController,
} from "../../controllers/index.js";
import { AirplaneMiddleware } from "../../middlewares/index.js";

const airplaneRoutes = Router();

/*
/api/v1/airplane
*/

airplaneRoutes.post("/", AirplaneMiddleware, createAirplaneController);
airplaneRoutes.get("/", AirplaneMiddleware, getAllAirplaneController);
airplaneRoutes.get("/:id", AirplaneMiddleware, getAirplaneController);

export default airplaneRoutes;
