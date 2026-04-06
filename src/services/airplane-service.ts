import { ValidationError, ValidationErrorItem } from "sequelize";

import type { IAirplane } from "../interfaces/model.js";
import { AirplaneRepository } from "../repositories/index.js";
import { logger } from "../config/index.js";
import AppError from "../utils/error/app-error.js";
import { StatusCodes } from "http-status-codes";

const airplaneRepository = new AirplaneRepository();

/*
creating airplane

*/

async function createAirplane(data: IAirplane) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error: unknown) {
    // if (error instanceof Error && error.name === "SequelizeValidationError") {
    if (error instanceof ValidationError) {
      let explanation: string[] = [];
      // console.log("oject", Object.values(error.errors[0]));
      error.errors.forEach((err: ValidationErrorItem) => {
        explanation.push(err.message);
      });
      console.log("explanation", explanation);
      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }

    logger.error("Something went wrong in the airplane-service: create");
    throw error;
  }
}

export default createAirplane;
