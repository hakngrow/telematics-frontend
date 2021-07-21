import http from "../http-common";

const getAll = () => {
  return http.get("/drivers");
};

const get = (id) => {
  return http.get(`/drivers/${id}`);
};

const create = (data) => {
  return http.post("/drivers", data);
};

const update = (id, data) => {
  return http.put(`/drivers/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/drivers/${id}`);
};

const removeAll = () => {
  return http.delete(`/drivers`);
};

const findByName = (name) => {
  return http.get(`/drivers?name=${name}`);
};

const DriverService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};

export default DriverService;
