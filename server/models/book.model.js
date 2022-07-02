import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        requred: true,
        trim: true
    },
    author: {
        type: String,
        unique: false,
        requred: true,
        trim: true
    },
    cover: {
        type: String,
        unique: false,
        requred: false,
        trim: false
    },
    createdBy: {
        type: String,
        unique: false,
        requred: true,
        trim: false
    },
    createdAt: {
        type: Date,
        unique: false,
        requred: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        unique: false,
        requred: false,
        default: new Date()
    }
});

export default mongoose.model('book', bookSchema);