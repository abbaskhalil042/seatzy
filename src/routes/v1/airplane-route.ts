import { Router } from "express";
import { createAirplaneController } from "../../controllers/index.js";
import { AirplaneMiddleware } from "../../middlewares/index.js";

const airplaneRoutes = Router();

/*
/api/v1/airplane
*/
console.log("vi route");
airplaneRoutes.post("/", AirplaneMiddleware, createAirplaneController);

export default airplaneRoutes;
