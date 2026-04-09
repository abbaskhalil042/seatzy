import { Router } from "express";
import { AirportMiddleware } from "../../middlewares/index.js";

import {
  createAirportController,
  deleteAirportController,
  getAirportController,
  getAllAirportController,
  updateAirportController,
} from "../../controllers/index.js";

const airportRoutes = Router();

airportRoutes.post("/", AirportMiddleware, createAirportController);
airportRoutes.get("/", getAllAirportController);
airportRoutes.get("/:id", getAirportController);
airportRoutes.patch("/:id", updateAirportController);
airportRoutes.delete("/:id", deleteAirportController);

export default airportRoutes;
