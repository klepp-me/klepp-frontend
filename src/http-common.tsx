import axios from "axios";
import { API_CONFIG } from "./config/api_config";
export default axios.create({
  baseURL: `${API_CONFIG.baseUrl}`,
  headers: {
    "Content-type": "application/json"
  }
});
