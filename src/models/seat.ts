"use strict";
import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";
import type { Iseats } from "../interfaces/model.js";
import { SEAT_ENUM } from "../utils/common/enum.js";

const { ECONOMY, FIRSTCLASS, BUSINESS, PREMIUM } = SEAT_ENUM;

class Seat extends Model<Iseats> {
  static associate(models: any) {
    this.belongsTo(models.Airplane, {
      foreignKey: "airplaneId",
      onDelete: "CASCADE",
    });
  }
}
Seat.init(
  {
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [ECONOMY, FIRSTCLASS, BUSINESS, PREMIUM],
      defaultValue: ECONOMY,
    },
  },
  {
    sequelize,
    modelName: "Seat",
  }
);

export default Seat;
