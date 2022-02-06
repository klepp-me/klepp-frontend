import axios from "axios";
export default axios.create({
  baseURL: "https://api.klepp.me/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});
