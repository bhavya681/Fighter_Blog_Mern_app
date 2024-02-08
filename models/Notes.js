import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const NotesSchema = new Schema({

    user: {
        type: ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    champion: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true,
    },
    nickname: {
        type: String,
        required: false
    },
    division: {
        type: String,
        default: 'Genreal',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

export default model('notes', NotesSchema);