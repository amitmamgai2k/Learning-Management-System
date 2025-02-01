import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {

    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {},
};
export const createAccount = createAsyncThunk('auth/createAccount', async (data) => {
    try {
        const response = await axiosInstance.post('/user/register', data);
        toast.promise(response, {
            loading: 'Creating Account...',
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => `Error: ${error.message}`,
        });

        return (await response).data;

    } catch (error) {
        toast.error(error?.response?.data?.message);

    }
});
export const login  = createAsyncThunk('auth/login', async (data) => {
    try {
        const response =  axiosInstance.post('/user/login', data);
        toast.promise(response, {
            loading: 'Logging In...',
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => `Error: ${error.message}`,
        });

        return (await response).data;

    } catch (error) {
        toast.error(error?.response?.data?.message);

    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
