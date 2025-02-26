import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice.js'
import lectureSliceReducer from './Slices/LectureSlice.js'
import razorpaySliceReducer from './Slices/RazorpaySlice.js'
const store  = configureStore({
    reducer : {
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay: razorpaySliceReducer,
        lectures:lectureSliceReducer


    },
    devTools : true

});

export default store;