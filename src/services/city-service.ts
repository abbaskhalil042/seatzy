import { ValidationError, ValidationErrorItem } from "sequelize";
import type { Iairport } from "../interfaces/model.js";
import { CityRepository } from "../repositories/index.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/error/app-error.js";
import { logger } from "../config/logger.js";

const cityRepository = new CityRepository();

export async function createCity(data: Iairport) {
  try {
    const airplane = await cityRepository.create(data);
    return airplane;
  } catch (error: unknown) {
    // if (error instanceof Error && error.name === "SequelizeValidationError") {
    if (error instanceof ValidationError) {
      let explanation: string[] = [];
      // console.log("oject", Object.values(error.errors[0]));
      error.errors.forEach((err: ValidationErrorItem) => {
        explanation.push(err.message);
      });

      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }

    logger.error("Something went wrong in the airplane-service: create");
    throw error;
  }
}
