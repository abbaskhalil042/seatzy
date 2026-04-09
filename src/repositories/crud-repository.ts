class CrudRepository {
  constructor(private model: any) {
    this.model = model;
  }
  async create(data: any) {
    const response = await this.model.create(data);
    return response;
  }
  async get(id: any) {
    const response = await this.model.findByPk(id);
    return response;
  }
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }
  async update(id: any, data: any) {
    //data -> {col and value}-> data willl be passed as object
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
  async delete(id: any) {
    const response = await this.model.destroy({
      where: {
        id: id,
      },
    });
    return response;
  }
}

export default CrudRepository;
