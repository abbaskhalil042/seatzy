import { Router } from "express";
import {
  createCityController,
  getCityController,
  getAllCitiesController,
  updateCityConroller,
  deleteCityController,
} from "../../controllers/index.js";
import { CityMiddleware } from "../../middlewares/index.js";

const cityRoutes = Router();

/*
/api/v1/airplane
*/

cityRoutes.post("/", CityMiddleware, createCityController);
cityRoutes.get("/", CityMiddleware, getAllCitiesController);
cityRoutes.get("/:id", CityMiddleware, getCityController);
cityRoutes.patch("/:id", CityMiddleware, updateCityConroller);
cityRoutes.delete("/:id", CityMiddleware, deleteCityController);

export default cityRoutes;
