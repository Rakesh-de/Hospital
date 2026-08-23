import axios from "axios";

const aiApi = axios.create({
  baseURL: process.env.AI_BACKEND_URL || "http://localhost:8000",
  timeout: 60000,
});

export default aiApi;