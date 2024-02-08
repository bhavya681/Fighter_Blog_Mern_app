import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema({

    message: {
        type: String,
        required: true
    },
    user: {
        type: String,
        req: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model('chats', ChatSchema);