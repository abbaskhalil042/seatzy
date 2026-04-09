"use strict";

import { DataTypes, Model } from "sequelize";
import type { Iflights } from "../interfaces/model.js";
import sequelize from "./index.js";
class flight extends Model<Iflights> {
  static associate(models: any) {
    // define association here
    this.belongsTo(models.Airplane, {
      foreignKey: "airplaneId",
    });
    this.belongsTo(models.Airport, {
      foreignKey: "departureAirportId",
    });
    this.belongsTo(models.Airport, {
      foreignKey: "arrivalAirportId ",
    });
  }
}
flight.init(
  {
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boardingGate: {
      type: DataTypes.STRING,
    },
    totalSeats: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "flight",
  }
);
export default flight;
