import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/Part");
  }

  get(id) {
    return http.get(`/Part/${id}`);
  }
  
  theLatest(number) {
    return http.get(`/Part?theLatest=${number}`);
  }

  create(data) {
    return http.post("/Part/", data);
  }

  update(id, data) {
    return http.put(`/Part/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Part/${id}`);
  }

  deleteAll() {
    return http.delete(`/Part`);
  }

  findByManufacturer(name) {
    return http.get(`/Part?Manufacturer=${name}`);
  }
}

export default new DataService();