import axios from "axios";

const api = axios.create({
  baseURL: 'https://meliuz-server-projeto.herokuapp.com/',
});

export default api;