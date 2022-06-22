import axios from "axios"

const API_URL = "api/users/"

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const getUsers = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

const deleteUser = (id) => {
  const response = axios.delete(API_URL + id)
  return response.data
}

const authService = {
  register,
  logout,
  login,
  getUsers,
  deleteUser,
}

export default authService