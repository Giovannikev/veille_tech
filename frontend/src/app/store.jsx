import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import menuReducer from "../features/menus/menuSlice"
import restaurantReducer from '../features/restaurants/restaurantSlice';
import reservationReducer from '../features/reservations/reservationSlice';
import tableReducer from '../features/tables/tableSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurants: restaurantReducer,
        menus: menuReducer,
        reservations: reservationReducer,
        tables: tableReducer
    },
})