import { StatusCodes } from "http-status-codes";
import type { ValidationError } from "sequelize";
import AppError from "../error/app-error.js";

export function handleValidationError(error: ValidationError) {
  const explanation = error.errors.map((err) => err.message);
  return new AppError(StatusCodes.BAD_REQUEST, explanation);
}
