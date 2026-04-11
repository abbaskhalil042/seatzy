import Flight from "./flight.js";
import Airport from "./airport.js";
import { Airplane } from "./airplane.js";
import { City } from "./city.js";
import sequelize from "./sequelize.js";
import Seat from "./seat.js";

const models: any = {
  Flight,
  Airport,
  Airplane,
  City,
  Seat,
};

const uniqueModels = [...new Set(Object.values(models))];

uniqueModels.forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { Flight, Airport, Airplane, City, Seat };
export { models };
export default sequelize;
