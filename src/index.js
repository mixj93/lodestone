import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'

// * set up axios
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000'
    : '/.netlify/functions'

axios.defaults.baseURL = baseUrl

axios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.error(error)
    return Promise.reject(error)
  }
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
