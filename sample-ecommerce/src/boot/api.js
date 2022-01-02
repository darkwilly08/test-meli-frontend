import axios from "axios";

const STATUS = {
  idle: 1,
  loading: 2,
  loaded: 3,
  error: 4
};

const AXIOS = axios.create({
  baseURL: "/api",
  timeout: 10000
});

export { AXIOS, STATUS };
