import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
    coursesData: [],
};

export const getAllCourses = createAsyncThunk('/course/get', async () => {
    try {
        const response = await toast.promise(
            axiosInstance.get('/courses/'), // Pass the promise
            {
                loading: 'Loading Courses...',
                success: 'Courses Loaded Successfully',
                error: (error) => `Error: ${error.message}`,
            }
        );
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error; // Ensure createAsyncThunk properly catches the error
    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action?.payload?.courses){
                console.log('action payload',action?.payload);

                state.coursesData = [...action?.payload.courses];
            }
        })
    }
    },
);


export default courseSlice.reducer;
