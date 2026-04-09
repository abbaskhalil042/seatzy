import type { Request, Response } from "express";
import {
  createFlight,
  getFlight,
  getFlights,
  updateFlight,
  deleteFlight,
  deleteAirport,
} from "../services/index.js";
import AppError from "../utils/error/app-error.js";
import { ErrorResponse, SuccesResponse } from "../utils/common/index.js";
import { StatusCodes } from "http-status-codes";

// create flight controller
export async function createFlightController(req: Request, res: Response) {
  try {
    const {
      flightNumber,
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      price,
      departureTime,
      boardingGate,
      totalSeats,
      arrivalTime,
    } = req.body;

    const flight = await createFlight({
      flightNumber,
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      price,
      boardingGate,
      totalSeats,
      departureTime,
      arrivalTime,
    });

    SuccesResponse.message = "Successfully created a flight";
    SuccesResponse.data = flight;

    return res.status(StatusCodes.CREATED).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = {
        ...error,
        explanation: error.message.split(","),
      };
      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// flight  controller for getting data by id
export async function getFlightController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const flight = await getFlight(id);
    SuccesResponse.message = "Successfully got flight";
    SuccesResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}

// airport controller for getting all data

export async function getAllFlightsController(req: Request, res: Response) {
  try {
    const flights = await getFlights();
    SuccesResponse.message = "Successfully got all flights";
    SuccesResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;

      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}

// airplane controller for updating airpot
export async function updateFlightController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const flight = await updateFlight(id, req.body);
    SuccesResponse.message = "Successfully updated the flight";
    SuccesResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;

      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}

export async function deleteFlightController(req: Request, res: Response) {
  try {
    const flight = await deleteAirport(req.params.id);
    SuccesResponse.message = "Successfully delete the flight";
    SuccesResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;

      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}
