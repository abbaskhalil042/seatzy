import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";

export function AirportMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.name && !req.body.code! && req.body.cityId) {
    ErrorResponse.message = "Something went while creating the airport .";
    ErrorResponse.error = new AppError(
      StatusCodes.BAD_REQUEST,
      "Name or Code or CityId are not found in the incoming request"
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
