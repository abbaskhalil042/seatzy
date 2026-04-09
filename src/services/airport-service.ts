import { ValidationError } from "sequelize";
import type { Iairport } from "../interfaces/model.js";
import { AirportRepository } from "../repositories/index.js";
import { handleValidationError } from "../utils/common/handleValidationError.js";
import AppError from "../utils/error/app-error.js";
import { StatusCodes } from "http-status-codes";

const airportRepository = new AirportRepository();

export async function createAirport(data: Iairport) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
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
  Getting a airport by id
  */

export async function getAirport(id: any) {
  try {
    const airport = await airportRepository.get(id);
    if (!airport) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `airport with id ${id} was not found.`
      );
    }
    return airport;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot fetch airport details"
    );
  }
}

/**
 *
 *Getting all airport
 */

export async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    if (!airports) {
      throw new AppError(StatusCodes.NOT_FOUND, "No airports were found.");
    }
    return airports;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot fetch airports"
    );
  }
}

/**
 *
 * Updating the airport details
 */

export async function updateAirport(id: any, data: any) {
  try {
    if (!id || !data) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Both airport id and update data are required to update an airport."
      );
    }
    const airport = await airportRepository.update(id, data);

    return airport;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot update airport"
    );
  }
}

/**
 *
 * Deleteing the airport details
 */

export async function deleteAirport(id: any) {
  try {
    if (!id) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "airport id is required to delete an airport."
      );
    }
    const airport = await airportRepository.delete(id);

    return airport;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot delete airport"
    );
  }
}
