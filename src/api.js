import axios from 'axios';

const API_URL = 'https://user-backend-gdsd.onrender.com/api/users/'; // Ensure the URL matches your backend endpoint

export const getUsers = () => {
  return axios.get(API_URL);
};

export const getUser = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createUser = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};