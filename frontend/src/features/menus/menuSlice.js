import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from './menuService';

// Thunk pour obtenir les menus par restaurant ID
export const getMenusByRestaurantId = createAsyncThunk(
    'menus/getMenusByRestaurantId',
    async (id, thunkAPI) => {
        try {
            var data = await menuService.getMenusByRestaurantId(id);
            console.log('Fetched menus:', data);
            return data;
        } catch (error) {
            console.error('Error fetching menus:', error);
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const menuSlice = createSlice({
    name: 'menus',
    initialState: {
        menus: [],
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMenusByRestaurantId.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getMenusByRestaurantId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menus = action.payload;
            })
            .addCase(getMenusByRestaurantId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default menuSlice.reducer;
