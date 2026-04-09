import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import { compareDates } from "../utils/helper/compareDates.js";

export function FlightMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    flightNumber,
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    price,
    departureTime,
    // boardingGate, optional
    totalSeats,
    arrivalTime,
  } = req.body;

  const missingFields: string[] = [];

  if (!flightNumber) missingFields.push("flightNumber");
  if (!airplaneId) missingFields.push("airplaneId");
  if (!departureAirportId) missingFields.push("departureAirportId");
  if (!arrivalAirportId) missingFields.push("arrivalAirportId");
  if (!price) missingFields.push("price");
  //   if (!boardingGate) missingFields.push("boardingGate");//optional
  if (!departureTime) missingFields.push("departureTime");
  if (!totalSeats) missingFields.push("totalSeats");
  if (!arrivalTime) missingFields.push("arrivalTime");

  const d = compareDates(departureTime, arrivalTime);
  if (!d) {
    console.log("came here");
    ErrorResponse.message = "Something went while creating the flight .";
    ErrorResponse.error = new AppError(
      StatusCodes.BAD_REQUEST,
      `Arrival should be ahead than departure time `
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (missingFields.length > 0) {
    ErrorResponse.message = "Something went while creating the flight .";
    ErrorResponse.error = new AppError(
      StatusCodes.BAD_REQUEST,
      `Missing fields ${missingFields.join(", ")} are required`
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
