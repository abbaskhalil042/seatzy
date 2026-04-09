
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
    createAirport,
    deleteAirport,
    getAirport,
    getAirports,
    updateAirport,
} from "../services/index.js";
import { ErrorResponse, SuccesResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";

// export interface Iairport {
//     name: string;
//     code: string;
//     address: string;
//     cityId: number;
//   }

// create airport controller
export async function createAirportController(req: Request, res: Response) {
  try {
    const airplane = await createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccesResponse.message = "Successfully create an airport";
    SuccesResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = {
        ...error,
        explanation: error.message.split(","),
      };
      return res.status(error?.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

// airport  controller for getting data by id
export async function getAirportController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const airplane = await getAirport(id);
    SuccesResponse.message = "Successfully got airport";
    SuccesResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}

// airport controller for getting all data

export async function getAllAirportController(req: Request, res: Response) {
  try {
    const airplane = await getAirports();
    SuccesResponse.message = "Successfully got all airport";
    SuccesResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;

      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}

// airplane controller for updating airpot
export async function updateAirportController(req: Request, res: Response) {
  try {
    const airplane = await updateAirport(req.params.id, req.body);
    SuccesResponse.message = "Successfully updated the airport";
    SuccesResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;

      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}

export async function deleteAirportController(req: Request, res: Response) {
  try {
    const airplane = await deleteAirport(req.params.id);
    SuccesResponse.message = "Successfully delete the airport";
    SuccesResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccesResponse);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      ErrorResponse.error = error;

      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof Error) {
      ErrorResponse.error = error;

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
}
