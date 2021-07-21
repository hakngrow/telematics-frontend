import http from "../http-common";

const getAll = () => {
  return http.get("/performances");
};

const get = (id) => {
  return http.get(`/performances/${id}`);
};

const create = (data) => {
  return http.post("/performances", data);
};

const update = (id, data) => {
  return http.put(`/performances/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/performances/${id}`);
};

const removeAll = () => {
  return http.delete(`/performances`);
};

const findByDriverId = (driverId) => {
  return http.get(`/performances/${driverId}`);
};

const PerformanceService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByDriverId,
};

export default PerformanceService;
