import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ErrorResponse, SuccesResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import {
  createCity,
  deleteCity,
  getCities,
  getCity,
  updateCity,
} from "../services/index.js";

//create city controller
export async function createCityController(req: Request, res: Response) {
  try {
    const { name } = req.body;

    const city = await createCity({
      name,
    });
    SuccesResponse.message = "Successfully create a city";
    SuccesResponse.data = city;

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

// city controller for geting data by id
export async function getCityController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const city = await getCity(id);
    SuccesResponse.message = "Successfully got city";
    SuccesResponse.data = city;
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

// city controller forr getting all city data

export async function getAllCitiesController(req: Request, res: Response) {
  try {
    const cities = await getCities();
    SuccesResponse.message = "Successfully got all cities";
    SuccesResponse.data = cities;

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

// city controller for updating airplane

export async function updateCityConroller(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const city = await updateCity(id, req.body);
    SuccesResponse.message = "Successfully update the city ";
    SuccesResponse.data = city;
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

//  city controller for deleting city

export async function deleteCityController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const city = await deleteCity(id);
    SuccesResponse.message = "Successfully delete the city";
    SuccesResponse.data = city;
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
