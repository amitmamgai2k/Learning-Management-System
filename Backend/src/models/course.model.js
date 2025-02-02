import mongoose,{Schema} from 'mongoose';

const courseSchema = new Schema({
    title : {
        type : String,
        required : [true,'Title is required'],
        trim : true,
        minLength : [8,'Title must be at least 3 character'],
        maxLength : [50,'Title must be less than 50 character']
    },
    description : {
        type : String,
        required : true,
        trim : true,
        minLength : [3,'Description must be at least 3 character'],
        maxLength : [500,'Description must be less than 500 character']
    },
    thumbnail : {
        type : String,
        required : true,

    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,

        minLength : [2,'Category must be at least 2 character'],
        maxLength : [50,'Category must be less than 50 character']
    },
    instructor : {
        type : String,

        minLength : [2,'Instructor must be at least 2 character'],
        maxLength : [50,'Instructor must be less than 50 character']
    },
   lectures:[
    {
        title : {
            type : String,

            minLength : [3,'Lecture title must be at least 3 character'],
            maxLength : [50,'Lecture title must be less than 50 character']
        },
        description : {
            type : String,

            minLength : [3,'Lecture description must be at least 3 character'],
            maxLength : [500,'Lecture description must be less than 500 character']
        },
        lectureThumbnail : {
            type : String,


        },
    }
   ],
   numbersoflectures : {
    type:Number,
    default : 0
   }


},
    {timestamps : true}
);

export default mongoose.model('Course',courseSchema);