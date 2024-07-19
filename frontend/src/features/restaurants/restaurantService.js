import axios from 'axios';
const BACKEND_DOMAIN = "http://localhost:8000"

const TOP_LIST_RESTAURANT_URL = `${BACKEND_DOMAIN}/restaurant/list/top/api/`;
const LIST_RESTAURANT_URL = `${BACKEND_DOMAIN}/restaurant/list/api/`;
const DETAIL_RESTAURANT_URL = `${BACKEND_DOMAIN}/restaurant/detail/api/`;
const SEARCH_RESTAURANT_URL = `${BACKEND_DOMAIN}/restaurant/search/api/`;
const fetchRestaurants = async () => {
    const response = await axios.get(LIST_RESTAURANT_URL);
    return response.data;
};

const fetchTopRestaurants = async () => {
    const response = await axios.get(TOP_LIST_RESTAURANT_URL);
    return response.data;
};

const fetchRestaurantById = async (id) => {
    const response = await axios.get(`${DETAIL_RESTAURANT_URL}${id}/`);
    return response.data;
};
const searchRestaurants = async (query) => {
    const response = await axios.get(`${SEARCH_RESTAURANT_URL}?q=${query}`);
    return response.data;
};

const restaurantService = {
    fetchRestaurants,
    fetchRestaurantById,
    searchRestaurants,
    fetchTopRestaurants,
};

export default restaurantService;
