import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {

    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {},
};
export const createAccount = createAsyncThunk(
    'auth/signup',
    async (data) => {
        try {
            const response = await axiosInstance.post('/users/register', data);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
            throw error; // This is important to properly reject the thunk
        }
    }
);


export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = await axiosInstance.post('/users/login', data); // ✅ Await here

        console.log(response.data, 'data of data'); // Now this will show the correct response

        await toast.promise(Promise.resolve(response), {  // ✅ Ensure the promise is awaited properly
            loading: 'Logging In...',
            success: (res) => res?.data?.message, // ✅ Access res.data.message correctly
            error: (error) => `Error: ${error.message}`,
        });

        return response.data; // ✅ Now returning resolved response data

    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
        throw error; // ✅ Ensure the error is properly thrown for rejection handling
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await axiosInstance.get('/user/logout');
        toast.promise(response, {
            loading: 'Logging Out...',
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
    extraReducers: (builder) => {
        builder.addCase(createAccount.fulfilled, (state, action) => {
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('role', action?.payload?.user?.role);
          localStorage.setItem('data', JSON.stringify(action?.payload?.user));
          state.isLoggedIn = true;
          state.role = action?.payload?.user?.role;
          state.data = action?.payload?.user;
        })
        .addCase(logout.fulfilled, (state) => {
           localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
        }).addCase(login.fulfilled, (state,action) => {
            console.log(action?.payload?.data,'payload');

            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.data?.role);
            localStorage.setItem('data', JSON.stringify(action?.payload?.data));
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.role;
            state.data = action?.payload?.data;

        })

    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
