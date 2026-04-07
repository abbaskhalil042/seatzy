import { Router } from "express";
import {
  createAirplaneController,
  deleteAirplanController,
  getAirplaneController,
  getAllAirplaneController,
  updateAirplaneController,
} from "../../controllers/index.js";
import { AirplaneMiddleware } from "../../middlewares/index.js";

const airplaneRoutes = Router();

/*
/api/v1/airplane
*/

airplaneRoutes.post("/", AirplaneMiddleware, createAirplaneController);
airplaneRoutes.get("/", AirplaneMiddleware, getAllAirplaneController);
airplaneRoutes.get("/:id", AirplaneMiddleware, getAirplaneController);
airplaneRoutes.get("/:id", AirplaneMiddleware, updateAirplaneController);
airplaneRoutes.get("/:id", AirplaneMiddleware, deleteAirplanController);

export default airplaneRoutes;
