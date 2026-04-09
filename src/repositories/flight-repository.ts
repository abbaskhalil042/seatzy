import flight from "../models/flight.js";
import { CrudRepository } from "./index.js";

class FlightRepository extends CrudRepository {
  constructor() {
    super(flight);
  }
}

export default FlightRepository;
