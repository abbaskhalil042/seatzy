import { Sequelize } from "sequelize";

// We read the config and create the Sequelize connection here.
//    Every model file imports this `sequelize` instance.
//    This replaces the old CJS boilerplate that auto-loaded models.

const env = process.env.NODE_ENV || "development";

// Using createRequire to load JSON — TypeScript with ESM doesn't support
//    `import config from "./config.json"` without extra tsconfig flags.
//    This is the standard workaround.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("../config/config.json")[env];

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export default sequelize;
