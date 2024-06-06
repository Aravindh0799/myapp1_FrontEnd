import axios from "axios";

const instance = axios.create({
  baseURL:
    'https://myapp1-1.onrender.com',
  // 'http://172.20.10.4:10080/',
  // timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;