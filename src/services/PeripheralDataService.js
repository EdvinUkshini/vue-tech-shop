import http from "../http-common";

class DataService {
  getAll(type,lth,gth) {
    return http.get(`/peripheral?type=${type}&lessThan=${lth}&greaterThan=${gth}`);
  }

  get(id) {
    return http.get(`/peripheral/${id}`);
  }
  
  theLatest(number) {
    return http.get(`/peripheral?type=1&type=2&type=3&type=4&type=5&type=6&theLatest=${number}&lessThan=0&greaterThan=10000`);
  }


  create(data) {
    return http.post("/peripheral/", data);
  }

  update(id, data) {
    return http.put(`/peripheral/${id}`, data);
  }

  delete(id) {
    return http.delete(`/peripheral/${id}`);
  }

  deleteAll() {
    return http.delete(`/peripheral`);
  }

  findByManufacturer(name) {
    return http.get(`/peripheral?Manufacturer=${name}`);
  }
}

export default new DataService();