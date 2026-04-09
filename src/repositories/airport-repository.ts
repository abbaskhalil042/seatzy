import { CrudRepository } from "./index.js";

import Airport from "../models/airport.js";

class AirportRepository extends CrudRepository {
  constructor() {
    super(Airport);
  }
}

export default AirportRepository;
