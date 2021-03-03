import http from "../http-common";

class DataService {
  getAll(lth,gth) {
    return http.get(`/Pc?lessThan=${lth}&greaterThan=${gth}`);
  }

  get(id) {
    return http.get(`/Pc/${id}`);
  }
  
  theLatest(number) {
    return http.get(`/Pc?theLatest=${number}&lessThan=0&greaterThan=10000`);
  }

  create(data) {
    return http.post("/Pc/", data);
  }

  update(id, data) {
    return http.put(`/Pc/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Pc/${id}`);
  }

  deleteAll() {
    return http.delete(`/Pc`);
  }

  findByCPU(name) {
    return http.get(`/Pc?name=${name}`);
  }
}

export default new DataService();