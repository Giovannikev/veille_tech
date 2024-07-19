import axios from 'axios';

const BACKEND_DOMAIN = 'http://localhost:8000';
const RESERVATIONS_URL = `${BACKEND_DOMAIN}/reservation/list/api/`;
const RESERVATION_DETAIL_URL = `${BACKEND_DOMAIN}/reservation/detail/api/`;
const SEARCH_RESERVATION_URL = `${BACKEND_DOMAIN}/reservation/search/api/`;
const RESERVATIONS_BY_RESTAURANT_URL = `${BACKEND_DOMAIN}/reservation/admin/list/api/`;
export const fetchReservationsByRestaurant = async (restaurantId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${RESERVATIONS_BY_RESTAURANT_URL}${restaurantId}/`, config);
    return response.data;
};
export const fetchReservations = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    }
    const response = await axios.get(RESERVATIONS_URL, config);
    console.log(response);
    return response.data;
};

export const deleteReservation = async (reservationId, accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    }
    const response = await axios.delete(`${RESERVATION_DETAIL_URL}${reservationId}/`, config);
    return response.data;
};

export const addReservation = async (reservationData) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    }
    const response = await axios.post(RESERVATIONS_URL, reservationData, config);
    return response.data;
};

export const updateReservation = async (reservationId, reservationData) => {
    const response = await axios.put(`${RESERVATIONS_URL}${reservationId}/`, reservationData);
    return response.data;
};


export const searchReservation = async (query) => {
    const response = await axios.get(`${SEARCH_RESERVATION_URL}?q=${query}`);
    return response.data;
};