import axios from "axios";
const api = axios.create({
    baseURL: "https://croquette.sa-pub.com/api/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  api.imageUrl = "https://croquette.sa-pub.com/storage/";

  
  export default api;