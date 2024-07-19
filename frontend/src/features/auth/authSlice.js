import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"))
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const restaurantId = JSON.parse(localStorage.getItem("restaurantId"));

const initialState = {
    user: user ? user : null,
    userInfo: userInfo ? userInfo : {},
    restaurantId: restaurantId ? restaurantId : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        authService.logout()
    }
)

export const activate = createAsyncThunk(
    "auth/activate",
    async (userData, thunkAPI) => {
        try {
            return await authService.activate(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (userData, thunkAPI) => {
        try {
            return await authService.resetPassword(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const resetPasswordConfirm = createAsyncThunk(
    "auth/resetPasswordConfirm",
    async (userData, thunkAPI) => {
        try {
            return await authService.resetPasswordConfirm(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUserInfo = createAsyncThunk(
    "auth/getUserInfo",
    async (_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            const userInfo = await authService.getUserInfo(accessToken);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            return userInfo;
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const checkUserRestaurant = createAsyncThunk(
    'auth/checkUserRestaurant',
    async (_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access;
            const restaurant = await authService.checkUserRestaurant(accessToken);
            localStorage.setItem("restaurantId", JSON.stringify(restaurant));
            return restaurant.restaurant_id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userInfo = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.userInfo = {};
                state.restaurantId = {};
                localStorage.removeItem("user");
                localStorage.removeItem("userInfo");
                localStorage.removeItem("restaurantId");
            })
            .addCase(activate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(activate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(activate.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(resetPasswordConfirm.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPasswordConfirm.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(resetPasswordConfirm.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload
            }).addCase(checkUserRestaurant.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkUserRestaurant.fulfilled, (state, action) => {
                state.isLoading = false;
                state.restaurantId = action.payload;
            })
            .addCase(checkUserRestaurant.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.restaurantId = null;
            });
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer