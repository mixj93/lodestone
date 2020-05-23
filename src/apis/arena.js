import axios from 'axios'

export const getCard = (cardName, className) => {
  return axios.get(`/arena-card?name=${cardName}&class=${className}`)
}

export const searchCards = (searchText, className) => {
  return axios.get(`/arena-cards?text=${searchText}&class=${className}`)
}
