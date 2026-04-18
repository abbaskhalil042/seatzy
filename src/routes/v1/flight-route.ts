import { Router } from "express";
import { FlightMiddleware } from "../../middlewares/index.js";
import {
  createFlightController,
  deleteFlightController,
  getAllFlightsController,
  getFlightController,
  updateFlightController,
  updateRemainingSeatsController,
} from "../../controllers/index.js";
import { bulkCreateController } from "../../controllers/flight-controller.js";
import { validateUpdateSeatsRequest } from "../../middlewares/flight-middleware.js";

const flightRoutes = Router();

flightRoutes.post("/", FlightMiddleware, createFlightController);
flightRoutes.get("/", getAllFlightsController);
flightRoutes.get("/:id", getFlightController);
flightRoutes.patch("/:id", updateFlightController);
flightRoutes.delete("/:id", deleteFlightController);
flightRoutes.post("/bulk", FlightMiddleware, bulkCreateController);
/**
 *
 *  this is for updating the setas
 *  api/v1/flights/seats patch
 */
flightRoutes.patch(
  "/:flightId/seats",
  validateUpdateSeatsRequest,
  updateRemainingSeatsController
);

export default flightRoutes;
