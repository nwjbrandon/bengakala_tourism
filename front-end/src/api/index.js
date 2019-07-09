import axios from 'axios';

const httpUrl = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api': 'https://bengkala.social/api';
axios.defaults.withCredentials = true;
const getRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.get(httpUrl + url, { params: data || {}, withCredentials: true })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
};

const delRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.delete(httpUrl + url, { data })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
};

const putRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.put(httpUrl + url, data, { withCredentials: true })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  })
};

const postRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(httpUrl + url, data, { withCredentials: true })
      .then(response => {
        resolve(response.data);
        console.log(response)
      })
      .catch(error => {
        reject(error);
      })
  })
};
export default {
  get: getRequest,
  del: delRequest,
  put: putRequest,
  post: postRequest
}

