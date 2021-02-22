import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/Peripheral");
  }

  get(id) {
    return http.get(`/Peripheral/${id}`);
  }
  
  theLatest(number) {
    return http.get(`/Peripheral?theLatest=${number}`);
  }

  create(data) {
    return http.post("/Peripheral/", data);
  }

  update(id, data) {
    return http.put(`/Peripheral/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Peripheral/${id}`);
  }

  deleteAll() {
    return http.delete(`/Peripheral`);
  }

  findByManufacturer(name) {
    return http.get(`/Peripheral?Manufacturer=${name}`);
  }
}

export default new DataService();