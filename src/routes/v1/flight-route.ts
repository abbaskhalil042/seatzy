import { Router } from "express";
import { FlightMiddleware } from "../../middlewares/index.js";
import {
  createFlightController,
  deleteFlightController,
  getAllFlightsController,
  getFlightController,
  updateFlightController,
} from "../../controllers/index.js";
import { bulkCreateController } from "../../controllers/flight-controller.js";

const flightRoutes = Router();

flightRoutes.post("/", FlightMiddleware, createFlightController);
flightRoutes.get("/", getAllFlightsController);
flightRoutes.get("/:id", getFlightController);
flightRoutes.patch("/:id", updateFlightController);
flightRoutes.delete("/:id", deleteFlightController);
flightRoutes.post("/bulk", FlightMiddleware, bulkCreateController);

export default flightRoutes;
