import { logger } from "../config/index.js";

class CrudRepository {
  //   model: any;
  constructor(private model: any) {
    this.model = model;
  }
  async create(data: any) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      logger.error("Something went wrong in the crud-repo: create");

      throw error;
    }
  }
  async get(id: any) {
    try {
      const response = await this.model.findByPk(id);
      return response;
    } catch (error) {
      logger.error("Something went wrong in the crud-repo: get");
      throw error;
    }
  }
  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      logger.error("Something went wrong in the crud-repo: get");
      throw error;
    }
  }
  async update(id: any, data: any) {
    try {
      //data -> {col and value}
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in the crud-repo: update");
      throw error;
    }
  }
  async delete(id: any) {
    try {
      const response = await this.model.destroy(id);
      return response;
    } catch (error) {
      logger.error("Something went wrong in the crud-repo: delete");
      throw error;
    }
  }
}

export default CrudRepository;
