import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
    lectures: [],
};

export const getAllLectures = createAsyncThunk('/lecture/get', async (cid) => {
    try {
        console.log('cide',cid);

        const response = await toast.promise(
            axiosInstance.post('/courses/getLectures',{cid}),
            {
                loading: 'Loading Lectures...',
                success: 'Lectures Loaded Successfully',
                error: 'Failed to load Lectures'
            }
        );
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error; // Ensure createAsyncThunk properly catches the error
    }
});
export const addCourseLectures = createAsyncThunk('/lecture/add', async (data) => {
    try {
        const formData = new FormData();
        formData.append('title', data?.title);
        formData.append('description', data?.description);
        formData.append('thumbnail', data?.thumbnail);
        formData.append('lecture', data?.lecture);
        const response =await axiosInstance.post('/add-lectures', formData);
        toast.promise(response, // Pass the promise
            {
                loading: 'Adding Lectures...',
                success: 'Lectures added Successfully',
                error: 'Failed to Add Lectures'
            })

        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error; // Ensure createAsyncThunk properly catches the error
    }
});
export const deleteCourseLectures = createAsyncThunk('/lecture/delete', async (data) => {
    try {;

        const response =await axiosInstance.delete('/delete-lectures');
        toast.promise(response, // Pass the promise
            {
                loading: 'Deleting Lectures...',
                success: 'Lectures deleted Successfully',
                error: 'Failed to delete Lectures'
            })

        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error; // Ensure createAsyncThunk properly catches the error
    }
});

const lectureSlice = createSlice({
    name: "lectures",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(getAllLectures.fulfilled, (state, action) => {
            if (action?.payload?.lectures) {
                state.lectures = action?.payload?.lectures;
            }
        }).addCase(addCourseLectures.fulfilled, (state, action) => {
            if (action?.payload?.lectures) {
                state.lectures = action?.payload?.lectures;
            }
        }).addCase(deleteCourseLectures.fulfilled, (state, action) => {
            if (action?.payload?.lectures) {
                state.lectures= action?.payload?.lectures;
            }
        })

    }
});

export default lectureSlice.reducer;