"use strict";
import { Model, DataTypes } from "sequelize";
import type { IAirplane } from "../interfaces/model.js";
import sequelize from "./index.js";

class Airplane extends Model<IAirplane> {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}

Airplane.init(
  {
    /*
     * the constraint are only js level if you want db level you need to change
     * in the migration
     */
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Aeroplane",
  }
);

export { Airplane };
