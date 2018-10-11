import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '/.netlify/functions'

axios.defaults.baseURL = baseUrl;

axios.interceptors.response.use(function(response) {
  return response.data;
}, function(error) {
  console.error(error);
  return Promise.reject(error);
});

export const getCard = (cardName, className) => {
  return axios.get(`/card?name=${cardName}&class=${className}`);
};

export const searchCards = (searchText, className) => {
  return axios.get(`/cards?text=${searchText}&class=${className}`);
};
