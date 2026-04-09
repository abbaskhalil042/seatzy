import { Router } from "express";
import airplaneRoutes from "./airplane-route.js";
import airportRoutes from "./airport-route.js";
import cityRoutes from "./city-route.js";

const v1Route = Router();

v1Route.use("/airplanes", airplaneRoutes);
v1Route.use("/airports", airportRoutes);
v1Route.use("/cities", cityRoutes);

export default v1Route;
