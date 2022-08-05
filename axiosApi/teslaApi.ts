import axios from "axios";

const teslaApi = axios.create({
  baseURL: "/api",
});

export default teslaApi;
