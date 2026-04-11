import flight from "./flight.js";
import Airport from "./airport.js";
import { Airplane } from "./airplane.js";
import { City } from "./city.js";
import sequelize from "./sequelize.js";

const models: any = {
  flight,
  Flight: flight,
  Airport,
  Airplane,
  City,
};

const uniqueModels = [...new Set(Object.values(models))];

uniqueModels.forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { flight, Airport, Airplane, City };
export { models };
export default sequelize;
