import axios from "axios";

const instance = axios.create({
    baseURL: 'http://172.20.10.2:8080/',
    // timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default instance;