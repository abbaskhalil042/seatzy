"use strict";
import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "./index.js";
import type { Icity } from "../interfaces/model.js";

//  what are these two ?
class City extends Model<Icity> {
  static associate(models: any) {
    // define association here
    this.hasMany(models.Airport, {
      foreignKey: "cityId",
    });
  }
}
City.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        unique: true,
      },
    },
  },
  {
    sequelize,
    modelName: "City",
  }
);

export { City };
