import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        requred: true,
        trim: true
    }
});

export default mongoose.model('book', bookSchema);