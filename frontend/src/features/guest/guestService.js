import axios from "axios"

const API_URL = "api/guests/"

const register = async (guestData) => {
    const response = await axios.post(API_URL, guestData)

    if (response.data) {
        localStorage.setItem('guest', JSON.stringify(response.data))
    }

    return response.data
}

const codeLogin = async (code) => {
    const response = await axios.post(API_URL + 'login', code)
    console.log("guestService.js: " + code.code)
    if (response.data) {
        localStorage.setItem('guest', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('guest')
}

const getGuests = async (token) => {


    const response = await axios.get(API_URL)

    return response.data
}

const addGuest = async (payload) => {
    const response = await axios.post(API_URL, payload)
    return response.data
}
const deleteGuest = async (id) => {
    const response = await axios.delete(API_URL + id)
    return response.data
}

const authService = {
    register,
    logout,
    codeLogin,
    getGuests,
    addGuest,
    deleteGuest,
}

export default authService