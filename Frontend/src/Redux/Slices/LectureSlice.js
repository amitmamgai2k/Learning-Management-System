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
export const addCourseLectures = createAsyncThunk('/add-lectures', async (data) => {
    console.log('data', data);

    const { title, description, courseId, videoUrl: lectureThumbnail } = data;

    try {
        // Wrap the request in toast.promise()
        const response = await toast.promise(
            axiosInstance.post('/courses/add-lectures', { title, description, lectureThumbnail, courseId }),
            {
                loading: 'Adding Lectures...',
                success: 'Lectures added Successfully',
                error: 'Failed to Add Lectures'
            }
        );

        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'An error occurred');
        throw error;
    }
});

export const deleteCourseLectures = createAsyncThunk('/lecture/delete', async (data) => {
    try {
        const lectureId = data.lectureId;
        const courseId = data.courseId;

        const response =await toast.promise(
            axiosInstance.post('/courses/delete-lectures',{lectureId,courseId}),

            {
                loading: 'Deleting Lectures...',
                success: 'Lectures deleted Successfully',
                error: 'Failed to delete Lectures'
            }
        );

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