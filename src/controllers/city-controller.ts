import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccesResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import { createCity } from "../services/city-service.js";
import type { Request, Response } from "express";

export async function createCityController(req: Request, res: Response) {
  try {
    const { name, code, address, cityId } = req.body;

    const city = await createCity({
      name,
      code,
      address,
      cityId,
    });
    SuccesResponse.message = "Successfully create a city";
    SuccesResponse.data = city;

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
