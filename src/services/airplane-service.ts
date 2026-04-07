import { ValidationError, ValidationErrorItem } from "sequelize";

import type { IAirplane } from "../interfaces/model.js";
import { AirplaneRepository } from "../repositories/index.js";
import { logger } from "../config/index.js";
import AppError from "../utils/error/app-error.js";
import { StatusCodes } from "http-status-codes";

const airplaneRepository = new AirplaneRepository();

/*
Creating airplane
*/

export async function createAirplane(data: IAirplane) {
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

      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }

    logger.error("Something went wrong in the airplane-service: create");
    throw error;
  }
}

/*
Getting a airplane by id
*/

export async function getAirplane(id: any) {
  try {
    const airplane = await airplaneRepository.get(id);
    if (!airplane) {
      throw new AppError(StatusCodes.NOT_FOUND, "airplane is not found");
    }
    return airplane;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      let explanation: string[] = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }
  }
}

/**
 *
 *Getting all airplane
 */

export async function getAirplanes() {
  try {
    const airplane = await airplaneRepository.getAll();
    if (!airplane) {
      throw new AppError(StatusCodes.NOT_FOUND, "airplanes are not found");
    }
    return airplane;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      let explanation: string[] = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }
  }
}

/**
 *
 * Updating the airplane details
 */

export async function updateAirplane(id: any, data: any) {
  try {
    if (!id || !data) {
      throw new AppError(StatusCodes.NOT_FOUND, "the id is not found");
    }
    const airplane = await airplaneRepository.update(id, data);

    return airplane;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      let explanation: string[] = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }
  }
}

/**
 *
 * Deleteing the airplane details
 */

export async function deletingAirplane(id: any) {
  try {
    if (!id) {
      throw new AppError(StatusCodes.NOT_FOUND, "id not found ");
    }
    const airplane = await airplaneRepository.delete(id);

    return airplane;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      let explanation: string[] = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }
  }
}
