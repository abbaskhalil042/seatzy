import { ValidationError } from "sequelize";
import type { Icity } from "../interfaces/model.js";
import { CityRepository } from "../repositories/index.js";
import { logger } from "../config/logger.js";
import { handleValidationError } from "../utils/common/handleValidationError.js";
import AppError from "../utils/error/app-error.js";
import { StatusCodes } from "http-status-codes";

const cityRepository = new CityRepository();

export async function createCity(data: Icity) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot create airplane"
    );
  }
}
/*
Getting a city by id
*/

export async function getCity(id: any) {
  try {
    const city = await cityRepository.get(id);
    if (!city) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `city with id ${id} was not found.`
      );
    }
    return city;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot fetch city details"
    );
  }
}

/**
 *
 *Getting all city
 */

export async function getCities() {
  try {
    const cities = await cityRepository.getAll();
    if (!cities) {
      throw new AppError(StatusCodes.NOT_FOUND, "No cities were found.");
    }
    return cities;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot fetch cities"
    );
  }
}

/**
 *
 * Updating the city details
 */

export async function updateCity(id: any, data: any) {
  try {
    if (!id || !data) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Both city id and update data are required to update an city."
      );
    }
    const city = await cityRepository.update(id, data);

    return city;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Cannot update city");
  }
}

/**
 *
 * Deleteing the city details
 */

export async function deleteCity(id: any) {
  try {
    if (!id) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "city id is required to delete an city."
      );
    }
    const city = await cityRepository.delete(id);

    return city;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Cannot delete city");
  }
}
