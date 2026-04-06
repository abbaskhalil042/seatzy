import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";

export function airplaneMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something went while creating the airplane.";
    ErrorResponse.error = new AppError(
      StatusCodes.BAD_REQUEST,
      "Model number not found in the incoming request"
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
