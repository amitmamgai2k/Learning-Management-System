import mongoose,{Schema} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from 'crypto';
const userSchema = new Schema({

    email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
        lowercase:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g ,'Please fill a valid email address']

    },
    fullname:{
        type:String,
        required:[true,'Name is required'],
        minLength:[2,'Name must be at least 5 character'],
        maxLength:[50,'Name must be less than 50 character'],
        trim:true,
        lowercase:true
    },
    mobileNumber:{
        type:Number,
        required:[true,'Mobile number is required'],
        unique:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true

    },
    role:{
        type:'String',
        enum:['USER',"ADMIN"],
        default:'USER'
     },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[8,'Password should be minimum 8 character'],
        select:false

    },
    refreshToken:{
        type:String
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date

},{
    timestamps:true
});

// Encrypt Password

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
         return next();
    }


this.password = await bcrypt.hash(this.password, 10)
next()
});
userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },
 process.env.REFRESH_TOKEN_SECRET,
 {
    expiresIn:'10d'
 }
)
}
userSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password);
    return isMatch;
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
userSchema.methods.generatePasswordResetToken = function() {
    // Generate a random token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to the user's schema
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

    return crypto.createHash('sha256').update(resetToken).digest('hex'); // Return the hashed token
};



const User  = mongoose.model('User',userSchema)

export default User