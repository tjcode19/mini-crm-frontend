import axios from 'axios';

let loginToken = localStorage.getItem('token')

export const HTTP = axios.create({
  baseURL: `http://localhost:8000/api/v1/`,
  headers: {
    Authorization:  `Bearer ${loginToken}`
  }
})