"use strict";

import { DataTypes, Model } from "sequelize";
import type { Iflights } from "../interfaces/model.js";
import sequelize from "./sequelize.js";
class Flight extends Model<Iflights> {
  static associate(models: any) {
    // define association here
    this.belongsTo(models.Airplane, {
      foreignKey: "airplaneId",
      as: "airplane",
    });
    this.belongsTo(models.Airport, {
      foreignKey: "departureAirportId",
      as: "departureAirport",
      targetKey: "code",
    });
    this.belongsTo(models.Airport, {
      foreignKey: "arrivalAirportId",
      as: "arrivalAirport",
      targetKey: "code",
    });
  }
}
Flight.init(
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
      //total reamaining  seats
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "flight",
  }
);
export default Flight;
