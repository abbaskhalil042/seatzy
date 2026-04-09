import type { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import { StatusCodes } from "http-status-codes";

export async function CityMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went while creating the city.";
    ErrorResponse.error = new AppError(
      StatusCodes.BAD_REQUEST,
      "Model number or Capacity are not found in the incoming request"
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}
