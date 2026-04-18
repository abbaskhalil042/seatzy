import {
  createAirplane,
  getAirplane,
  getAirplanes,
  updateAirplane,
  deletingAirplane,
} from "./airplane-service.js";

import {
  createAirport,
  getAirport,
  getAirports,
  updateAirport,
  deleteAirport,
} from "./airport-service.js";

import {
  createCity,
  getCity,
  getCities,
  updateCity,
  deleteCity,
} from "./city-service.js";

import {
  createFlight,
  deleteFlight,
  getFlight,
  getFlights,
  updateFlight,
  updateRemainingSeats,
} from "./flight-service.js";

export {
  //airplane import
  createAirplane,
  getAirplane,
  getAirplanes,
  updateAirplane,
  deletingAirplane,
  // city import
  createCity,
  getCity,
  getCities,
  updateCity,
  deleteCity,
  // airport import
  createAirport,
  getAirport,
  getAirports,
  updateAirport,
  deleteAirport,

  // flight import
  createFlight,
  getFlight,
  getFlights,
  updateFlight,
  deleteFlight,
  updateRemainingSeats

};
