import axios from "axios"

const BACKEND_DOMAIN = "http://localhost:8000"

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`
const GET_CURRENT_USER = `${BACKEND_DOMAIN}/accounts/current_user/`
const CHECK_USER_RESTAURANT = `${BACKEND_DOMAIN}/accounts/api/check-restaurant/`


// Register user
const register = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(REGISTER_URL, userData, config)
    return response.data
}


// Login user
const login = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(LOGIN_URL, userData, config)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

// Logout 
const logout = () => {
    return localStorage.removeItem("user")
}

// Activate user
const activate = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(ACTIVATE_URL, userData, config)
    return response.data
}


// Reset Password
const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(RESET_PASSWORD_URL, userData, config)
    return response.data
}

// Reset Password
const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config)
    return response.data
}

// Get User Info

const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.get(GET_CURRENT_USER, config)
    return response.data
}
const getCurrentUser = async () => {
    const response = await axios.get(GET_CURRENT_USER, config)
    return response.data;
}

const checkUserRestaurant = async (accessToken) => {
    const response = await axios.get(CHECK_USER_RESTAURANT, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response.data;

};
const authService = { checkUserRestaurant, getCurrentUser, register, login, logout, activate, resetPassword, resetPasswordConfirm, getUserInfo }
export default authService