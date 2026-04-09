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
airplaneRoutes.get("/", getAllAirplaneController);
airplaneRoutes.get("/:id", getAirplaneController);
airplaneRoutes.patch("/:id", updateAirplaneController);
airplaneRoutes.delete("/:id", deleteAirplanController);

export default airplaneRoutes;
