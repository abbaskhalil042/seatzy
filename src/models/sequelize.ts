import { Sequelize } from "sequelize";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable]!, config)
  : new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );

export default sequelize;
