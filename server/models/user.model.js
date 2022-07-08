import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        unique: false,
        requred: true,
        trim: true
    },
    lastName: {
        type: String,
        unique: false,
        requred: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        requred: true,
        trim: true
    },
    password: {
        type: String,
        unique: false,
        requred: true,
        trim: true
    },
    refreshToken: {
        type: String,
        unique: false,
        requred: true,
        trim: false
    },
    customerId: {
        type: String,
        unique: false,
        requred: false,
        trim: false,
        default: null
    },
    subscriptionId: {
        type: String,
        unique: false,
        requred: false,
        trim: false,
        default: null
    },
    roleKey: {
        type: String,
        unique: false,
        requred: false,
        trim: false
    },
    favoriteBooks: {
        type: [String],
        unique: false,
        requred: false,
        trim: false,
        default: []
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

export default mongoose.model('user', userSchema);