// src/features/restaurants/restaurantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import restaurantService from './restaurantService';

const initialState = {
    restaurants: [],
    searchResults: [],
    restaurant: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    query: '',
};

// create restaurant
export const createRestaurant = createAsyncThunk(
    'restaurants/create',
    async (formData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post('http://localhost:8000/api/restaurant/create/', formData, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Fetch all restaurants
export const getRestaurants = createAsyncThunk(
    'restaurants/getAll',
    async (_, thunkAPI) => {
        try {
            return await restaurantService.fetchRestaurants();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch top restaurants
export const getTopRestaurants = createAsyncThunk(
    'restaurants/getTop',
    async (_, thunkAPI) => {
        try {
            return await restaurantService.fetchTopRestaurants();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch restaurant by ID
export const getRestaurantById = createAsyncThunk(
    'restaurants/getById',
    async (id, thunkAPI) => {
        try {
            return await restaurantService.fetchRestaurantById(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const searchRestaurants = createAsyncThunk(
    'restaurants/searchRestaurants',
    async (query, thunkAPI) => {
        try {
            return await restaurantService.searchRestaurants(query);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurants.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRestaurants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.restaurants = action.payload;
            })
            .addCase(getRestaurants.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTopRestaurants.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTopRestaurants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.restaurants = action.payload;
            })
            .addCase(getTopRestaurants.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getRestaurantById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRestaurantById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.restaurant = action.payload;
            })
            .addCase(getRestaurantById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(searchRestaurants.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(searchRestaurants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchRestaurants.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            }).addCase(createRestaurant.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createRestaurant.fulfilled, (state, action) => {
                state.isLoading = false;
                state.restaurant = action.payload;
            })
            .addCase(createRestaurant.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reset } = restaurantSlice.actions;
export default restaurantSlice.reducer;
