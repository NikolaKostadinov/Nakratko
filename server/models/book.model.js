import mongoose from "mongoose";

import { encodeFileToWebBase64 } from '../modules/base64.js';

const DEFAULT_COVER = './assets/defaultcover.jpg';

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
        trim: false,
        default: encodeFileToWebBase64(DEFAULT_COVER)
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
        requred: false,
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