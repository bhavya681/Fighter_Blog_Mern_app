import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    secret:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user", 
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const User = model('user', UserSchema);
User.createIndexes();
export default User;