import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
    coursesData: [],
};

export const getAllCourses = createAsyncThunk('/courses/get', async () => {
    try {
        const response = await axiosInstance.get('/courses');
        toast.promise(response, {
            loading: 'Loading Courses...',
            success: (data) => `Courses Loaded Successfully`,
            error: (error) => `Error: ${error.message}`,
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }

})

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action?.payload){
                state.coursesData = [...action?.payload];
            }
        })
    }
    },
);


export default courseSlice.reducer;
