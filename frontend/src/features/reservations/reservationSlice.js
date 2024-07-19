import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reservationService from './reservationService';

const initialState = {
    reservations: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (accessToken, thunkAPI) => {
    try {
        var data = await reservationService.fetchReservations(accessToken);
        console.log('Fetched reservations:', data);
        return data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const fetchReservationsByRestaurant = createAsyncThunk('reservations/fetchReservationsByRestaurant', async ({ restaurantId, accessToken }, thunkAPI) => {
    try {
        const data = await reservationService.fetchReservationsByRestaurant(restaurantId, accessToken);
        return data;
    } catch (error) {
        console.error('Error fetching reservations for restaurant:', error);
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const searchReservations = createAsyncThunk(
    'reservations/searchReservation',
    async (query, thunkAPI) => {
        try {
            return await reservationService.searchReservation(query);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteExistingReservation = createAsyncThunk('reservations/deleteReservation', async ({ id, accessToken }, thunkAPI) => {
    try {
        return await reservationService.deleteReservation(id, accessToken);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const addNewReservation = createAsyncThunk('reservations/addReservation', async ({ reservationData, accessToken }, thunkAPI) => {
    try {
        const data = await reservationService.addReservation(reservationData, accessToken);
        return data;
    } catch (error) {
        const message = error.response && error.response.data ? error.response.data.message : error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateExistingReservation = createAsyncThunk(
    'reservations/updateReservation',
    async ({ id, reservationData }) => {
        try {
            return await reservationService.updateReservation(id, reservationData);
        } catch (error) {
            throw Error(error.response ? error.response.data.message : error.message);
        }
    }
);


export const reservationSlice = createSlice({
    name: 'reservations',
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
            .addCase(fetchReservations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReservations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reservations = action.payload;
            })
            .addCase(fetchReservations.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            }).addCase(fetchReservationsByRestaurant.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReservationsByRestaurant.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reservations = action.payload;
            })
            .addCase(fetchReservationsByRestaurant.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addNewReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reservations.push(action.payload);
            })
            .addCase(addNewReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(updateExistingReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateExistingReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.reservations.findIndex((res) => res.id === action.payload.id);
                if (index !== -1) {
                    state.reservations[index] = action.payload;
                }
            })
            .addCase(updateExistingReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(deleteExistingReservation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteExistingReservation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reservations = state.reservations.filter((res) => res.id !== action.payload);
            })
            .addCase(deleteExistingReservation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(searchReservations.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(searchReservations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchReservations.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            });
    },
});

export const { reset } = reservationSlice.actions;
export default reservationSlice.reducer;
