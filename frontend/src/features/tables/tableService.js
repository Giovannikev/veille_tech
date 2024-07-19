import axios from 'axios';

const BACKEND_DOMAIN = 'http://localhost:8000/table';
const GET_AVAILABLE_TABLE = `${BACKEND_DOMAIN}/available/api`;

export const fetchAvailableTables = async (accessToken, date) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const response = await axios.get(`${GET_AVAILABLE_TABLE}?date=${date}/`, config);
    return response.data;
};
