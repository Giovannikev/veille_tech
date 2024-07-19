import axios from 'axios';
const BACKEND_DOMAIN = "http://localhost:8000"
const MENU_RESTAURANT_URL = `${BACKEND_DOMAIN}/menu/list/api/`;

const getMenusByRestaurantId = async (restaurantId) => {
    const response = await axios.get(`${MENU_RESTAURANT_URL}${restaurantId}/`);
    return response.data;
};

const menuService = {
    getMenusByRestaurantId,
};

export default menuService;