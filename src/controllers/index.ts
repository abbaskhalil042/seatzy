import {
  createAirplaneController,
  getAllAirplaneController,
  getAirplaneController,
  updateAirplaneController,
  deleteAirplanController,
} from "./airplane-controller.js";
import {
  createAirportController,
  deleteAirportController,
  getAirportController,
  getAllAirportController,
  updateAirportController,
} from "./airport-controller.js";
import {
  createCityController,
  deleteCityController,
  getAllCitiesController,
  getCityController,
  updateCityConroller,
} from "./city-controller.js";
import {
  createFlightController,
  deleteFlightController,
  getAllFlightsController,
  getFlightController,
  updateFlightController,
  updateRemainingSeatsController,
} from "./flight-controller.js";

export {
  createAirplaneController,
  getAllAirplaneController,
  getAirplaneController,
  updateAirplaneController,
  deleteAirplanController,
  // import city controllers
  createCityController,
  getCityController,
  getAllCitiesController,
  updateCityConroller,
  deleteCityController,

  // import airport conrollers
  getAirportController,
  createAirportController,
  getAllAirportController,
  updateAirportController,
  deleteAirportController,
  // import flight controllers
  createFlightController,
  getFlightController,
  getAllFlightsController,
  updateFlightController,
  deleteFlightController,
  updateRemainingSeatsController
};

