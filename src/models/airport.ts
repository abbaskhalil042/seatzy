"use strict";

import { DataTypes, Model } from "sequelize";
import type { Iairport } from "../interfaces/model.js";
import sequelize from "./sequelize.js";

class Airport extends Model<Iairport> {
  static associate(models: any) {
    // define association here
    //   City.hasOne(Airport);
    //   Airport.belongsToMany(City);
    this.belongsTo(models.City, {
      foreignKey: "cityId",
      as: "city",
      onDelete: "CASCADE",
      // onUpdate: "CASCADE",
    });
    this.hasMany(models.Flight, {
      foreignKey: "departureAirportId",
      as: "departingFlights",
      sourceKey: "code",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Flight, {
      foreignKey: "arrivalAirportId",
      as: "arrivingFlights",
      sourceKey: "code",
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
