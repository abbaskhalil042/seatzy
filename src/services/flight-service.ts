import { StatusCodes } from "http-status-codes";
import { Op, ValidationError, cast, col, where } from "sequelize";
import type { IcustomFilter, Iflights } from "../interfaces/model.js";
import { FlightRepository } from "../repositories/index.js";
import { handleValidationError } from "../utils/common/handleValidationError.js";
import { ErrorResponse, SuccesResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import { getQueryValue } from "../utils/helper/getQeueryValue.js";

const flightRepository = new FlightRepository();

export async function createFlight(data: Iflights) {
  try {
    const flight = await flightRepository.create(data);
    SuccesResponse.message = "Successfully created flight";
    SuccesResponse.data = flight;
    return flight;
  } catch (error: unknown) {
    console.log("errro", error);
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot create flight"
    );
  }
}

export async function bulkCreate(data: Iflights[]) {
  try {
    const flight = await flightRepository.bulkCreateFlight(data);
    SuccesResponse.message = "Successfully created bulk flight";
    SuccesResponse.data = flight;
    return flight;
  } catch (error: unknown) {
    console.log("errro", error);
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot create flight"
    );
  }
}

// get single flight
export async function getFlight(id: any) {
  try {
    const flight = await flightRepository.get(id);
    // SuccesResponse.message = "Successfully created flight";
    // SuccesResponse.data = flight;
    // return flight;
    if (!flight) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `flight with id ${id} was not found.`
      );
    }
    return flight;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Cannot get flight");
  }
}

//get all flights
// export async function getFlights() {
//   try {

//     const flight = await flightRepository.getAll();
//     if (!flight) {
//       throw new AppError(StatusCodes.NOT_FOUND, "No flights were found.");
//     }
//     return flight;
//   } catch (error: unknown) {
//     if (error instanceof ValidationError) {
//       throw handleValidationError(error);
//     }
//     if (error instanceof AppError) {
//       throw error;
//     }
//     throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Cannot get flights");
//   }
// }

export async function getFlights(query: any) {
  try {
    let customFilter: IcustomFilter = {};
    let sort: string[][] = [];
    const endingTripDate = "23:59:00";
    const trips = getQueryValue(query.trips);
    const price = getQueryValue(query.price);
    const totalSeats = getQueryValue(query.totalSeats);
    const tripDate = getQueryValue(query.tripDate);
    const sortQuery = getQueryValue(query.sort);

    if (trips) {
      const [departureAirportId, arrivalAirportId] = trips.split("-");
      if (!departureAirportId || !arrivalAirportId) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "trips must be in DEPARTURE-ARRIVAL format"
        );
      }

      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;

      if (customFilter.arrivalAirportId === customFilter.departureAirportId) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "departure and arriaval cannot be same"
        );
      }
    }

    if (price) {
      const [min, max] = price.split("-");
      const minPrice = Number(min);
      const maxPrice = max === undefined ? 20000 : Number(max);

      if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "price must be in MIN or MIN-MAX numeric format"
        );
      }
      //**** ? */
      customFilter[Op.and] = [
        ...(customFilter[Op.and] ?? []),
        where(cast(col("price"), "SIGNED"), {
          [Op.between]: [minPrice, maxPrice],
        }),
      ];
    }

    if (totalSeats) {
      const seats = Number(totalSeats);
      if (Number.isNaN(seats)) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "totalSeats must be a number"
        );
      }

      customFilter.totalSeats = {
        [Op.gte]: seats,
      };
    }

    if (tripDate) {
      customFilter.departureTime = {
        [Op.between]: [`${tripDate} 00:00:00`, `${tripDate} ${endingTripDate}`],
      };
    }

    if (sortQuery) {
      const params = sortQuery.split(",");
      const sortFilter = params
        .map((param: string) => param.split("_"))
        .filter(
          (param: string[]) => param.length === 2 && param[0] && param[1]
        );
      sort = sortFilter;
    }

    const flight = await flightRepository.getAllFlights(customFilter, sort);

    return flight;
  } catch (error) {
    console.log("ACTUAL ERROR:", error);
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Cannot get flights");
  }
}

// update flight
export async function updateFlight(id: any, data: Iflights) {
  try {
    if (!id || !data) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Both flight id and update data are required to update an city."
      );
    }
    const flight = await flightRepository.update(id, data);

    return flight;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot update flight"
    );
  }
}

// delete

export async function deleteFlight(id: any) {
  try {
    if (!id) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "flight id is required to delete an city."
      );
    }
    const flight = await flightRepository.delete(id);
    return flight;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot delete flight"
    );
  }
}

/// increment and descrment

export async function updateRemainingSeats(data: any) {
  try {
    const seats = await flightRepository.updateRemainingSeats(
      data.flighId,
      data.seats,
      data.desc
    );
    return seats;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw handleValidationError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Cannot delete flight"
    );
  }
}
