import { Router } from "express";
import airplaneRoutes from "./airplane-route.js";
import airportRoutes from "./airport-route.js";
import cityRoutes from "./city-route.js";
import flightRoutes from "./flight-route.js";

const v1Route = Router();

v1Route.use("/airplanes", airplaneRoutes);
v1Route.use("/airports", airportRoutes);
v1Route.use("/cities", cityRoutes);
v1Route.use("/flights", flightRoutes);

export default v1Route;
