"use strict";
import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

import sequelize from "./index.js";

//  what are these two ?
class City extends Model<InferAttributes<City>, InferCreationAttributes<City>> {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}
City.init(
  {
    name: DataTypes.STRING,
    allowNull: false,
    validate: {
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "City",
  }
);

export { City };
