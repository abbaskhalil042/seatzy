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
  const flights = Array.isArray(req.body) ? req.body : [req.body];

  for (const [index, flightData] of flights.entries()) {
    const {
      flightNumber,
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      price,
      departureTime,
      totalSeats,
      arrivalTime,
    } = flightData;

    const missingFields: string[] = [];

    if (!flightNumber) missingFields.push("flightNumber");
    if (!airplaneId) missingFields.push("airplaneId");
    if (!departureAirportId) missingFields.push("departureAirportId");
    if (!arrivalAirportId) missingFields.push("arrivalAirportId");
    if (!price) missingFields.push("price");
    if (!departureTime) missingFields.push("departureTime");
    if (!totalSeats) missingFields.push("totalSeats");
    if (!arrivalTime) missingFields.push("arrivalTime");

    if (missingFields.length > 0) {
      const error = new AppError(
        StatusCodes.BAD_REQUEST,
        `Missing fields ${missingFields.join(
          ", "
        )} are required in flight at index ${index}`
      );

      return res.status(StatusCodes.BAD_REQUEST).json({
        ...ErrorResponse,
        error,
      });
    }

    if (!compareDates(departureTime, arrivalTime)) {
      const error = new AppError(
        StatusCodes.BAD_REQUEST,
        `Arrival time should be later than departure time in flight at index ${index}`
      );

      return res.status(StatusCodes.BAD_REQUEST).json({
        ...ErrorResponse,
        error,
      });
    }
  }

  next();
}

export function validateUpdateSeatsRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.seats) {
    ErrorResponse.message =
      "Something went while updating the remaining seats.";
    ErrorResponse.error = new AppError(
      StatusCodes.BAD_REQUEST,
      "seats or desc are not found in the incoming request"
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
