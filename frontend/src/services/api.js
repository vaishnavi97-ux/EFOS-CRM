import axios from "axios";

const API = axios.create({
  baseURL: "https://efos-crm-production.up.railway.app/api",
});

export default API;