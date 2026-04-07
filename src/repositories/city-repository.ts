import CrudRepository from "./crud-repository.js";
import { City } from "../models/city.js";
class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }
}

export default CityRepository;
