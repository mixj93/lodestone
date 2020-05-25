import axios from 'axios'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const instance = axios.create({
  baseURL: '/',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})

export const leaveMessgae = (formName, data) => {
  return instance({
    url: '/',
    method: 'post',
    data: encode({ 'form-name': formName, ...data })
  })
}
