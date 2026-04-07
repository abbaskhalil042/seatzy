import type { IAirplane } from "../interfaces/model.js";
import { logger } from "../config/index.js";

import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { ErrorResponse, SuccesResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import {
  createAirplane,
  getAirplane,
  getAirplanes,
} from "../services/index.js";

export async function createAirplaneController(req: Request, res: Response) {
  try {
    const airplane = await createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccesResponse.message = "Successfully create an airplane";
    SuccesResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = {
        ...error,
        explanation: error.message.split(","),
      };
      return res.status(error?.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// airplane  controller for getting data by id
export async function getAirplaneController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const airplane = await getAirplane(id);
    SuccesResponse.message = "Successfully got airplane";
    SuccesResponse.data = airplane;
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

// airplane controller for getting all data

export async function getAllAirplaneController(req: Request, res: Response) {
  try {
    const airplane = await getAirplanes();
    SuccesResponse.message = "Successfully got all airplane";
    SuccesResponse.data = airplane;
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
