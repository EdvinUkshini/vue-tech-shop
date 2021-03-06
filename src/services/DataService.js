import http from "../http-common"; // qekjo dmth bahet import edhe qaty u thirr metoda the latest

class DataService {
  getAll(lth,gth) {
    return http.get(`/Pc?lessThan=${lth}&greaterThan=${gth}`);
  }

  get(id) {
    return http.get(`/Pc/${id}`);
  }
  
  theLatest(number) { // here speak ok i get it hoe
    return http.get(`/Pc?theLatest=${number}&lessThan=0&greaterThan=10000`); // kjo ta kthen linkun per api
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