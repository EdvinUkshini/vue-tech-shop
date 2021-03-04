import http from "../http-common";

class DataService {
  getAll(type,lth,gth) {
    return http.get(`/Part?type=${type}&lessThan=${lth}&greaterThan=${gth}`);
  }

  get(id) {
    return http.get(`/Part/${id}`);
  }
  
  theLatest(number) {
    return http.get(`/Part?type=1&type=2&type=3&type=4&type=5&type=6&theLatest=${number}&lessThan=0&greaterThan=10000`);
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

  findByManufacturer(type,name) {
    return http.get(`/Part?type=${type}&Manufacturer=${name}`);
  }
}

export default new DataService();