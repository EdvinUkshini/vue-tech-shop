import http from "../http-common";

class DataService {
  getAll(lth,gth) {
    return http.get(`/Laptop?lessThan=${lth}&greaterThan=${gth}`);
  }

  get(id) {
    return http.get(`/Laptop/${id}`);
  }
  
  theLatest(number) {
    return http.get(`/Laptop?theLatest=${number}&lessThan=0&greaterThan=10000`);
  }

  create(data) {
    return http.post("/Laptop/", data);
  }

  update(id, data) {
    return http.put(`/Laptop/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Laptop/${id}`);
  }

  deleteAll() {
    return http.delete(`/Laptop`);
  }

  findByCPU(name) {
    return http.get(`/Laptop?name=${name}`);
  }
}

export default new DataService();