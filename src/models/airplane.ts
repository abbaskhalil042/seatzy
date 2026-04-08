"use strict";
import { Model, DataTypes } from "sequelize";
import type { IAirplane } from "../interfaces/model.js";
import sequelize from "./index.js";

class Airplane extends Model<IAirplane> {
  static associate(models: any) {
    // define association here
    this.hasMany(models.Flight, {
      foreignKey: "airplaneId",
      onDelete: "CASCADE",
    });
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
      validate: {
        isAlphanumeric: true,
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        max: 1000,
      },
    },
  },
  {
    sequelize,
    modelName: "Airplanes",
  }
);

export { Airplane };
