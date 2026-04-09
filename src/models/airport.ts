"use strict";

import { DataTypes, Model } from "sequelize";
import type { Iairport } from "../interfaces/model.js";
import sequelize from "./index.js";

class Airport extends Model<Iairport> {
  static associate(models: any) {
    // define association here
    //   City.hasOne(Airport);
    //   Airport.belongsToMany(City);
    this.belongsTo(models.City, {
      foreignKey: "cityId",
      onDelete: "CASCADE",
      // onUpdate: "CASCADE",
    });
    this.hasMany(models.Flight, {
      foreignKey: "departureAirportId",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Flight, {
      foreignKey: "arrivalAirportId",
      onDelete: "CASCADE",
    });
  }
}
Airport.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    code: {
      //BLR,DEL
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Airport",
  }
);
export default Airport;
