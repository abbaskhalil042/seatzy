import Flight from "../models/flight.js";
import { CrudRepository } from "./index.js";
import Airport from "../models/airport.js";
import { City } from "../models/city.js";
import { Airplane } from "../models/airplane.js";

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async bulkCreateFlight(data: any) {
    const response = await Flight.bulkCreate(data, {
      validate: true,
    });
    return response;
  }

  async getAllFlights(filter: any, sort: any) {
    const filtered = await Flight.findAll({
      where: filter,
      ...(sort.length > 0 ? { order: sort } : {}),
      include: [
        { model: Airplane, required: true, as: "airplane" },

        {
          model: Airport,
          as: "departureAirport",
          include: [
            {
              model: City,
              required: true,
              as: "city",
            },
          ],
        },
        {
          model: Airport,
          as: "arrivalAirport",
          include: [
            {
              model: City,
              required: true,
              as: "city",
            },
          ],
        },
      ],
    });
    return filtered;
  }
}

export default FlightRepository;
