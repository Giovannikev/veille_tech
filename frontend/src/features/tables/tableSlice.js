import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tableService from './tableService'
export const fetchAvailableTables = createAsyncThunk(
    'tables/fetchAvailableTables',
    async ({ accessToken, date }, thunkAPI) => {
        try {
            const response = await tableService.fetchAvailableTables(accessToken, date);
            return response;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const tableSlice = createSlice({
    name: 'tables',
    initialState: {
        availableTables: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailableTables.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAvailableTables.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.availableTables = action.payload;
            })
            .addCase(fetchAvailableTables.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default tableSlice.reducer;
