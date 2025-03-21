import axios from "axios";

const api = axios.create({
  // baseURL: "https://samenutest.sa-pub.com/api/v1/", // Replace with your API base URL

  baseURL: "https://croquette.sa-pub.com/api/", // Replace with your API base URL

  timeout: 10000, // Optional: Set a request timeout (in ms)
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;