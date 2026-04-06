import { Router } from "express";
import airplaneRoutes from "./airplane-route.js";

const v1Route = Router();


v1Route.use("/airplane", airplaneRoutes);

export default v1Route;
