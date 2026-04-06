import type { IAirplane } from "../interfaces/model.js";
import { logger } from "../config/index.js";
import { createAirplane } from "../services/index.js";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { ErrorResponse, SuccesResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";

async function createAirplaneController(req: Request, res: Response) {
  try {
    const airplane = await createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccesResponse.message = "Successfully create an airplane!";
    SuccesResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;
      return res.status(error?.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

export default createAirplaneController;
