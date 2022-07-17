import bcrypt from 'bcrypt';

import userModel from '../models/user.model.js';
import { generateAccessToken } from '../modules/accesstoken.js';
import { generateRefreshToken } from '../modules/refreshtoken.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

export const getUser = async (request, response) => {
    
    try {
        
        const user = request.query;

        const userInDBSecured = await userModel.find(user).select('-password');

        response.status(200).json({ user: userInDBSecured });

    } catch (error) {
        serverError(response, error);
    }
}

export const loginUser = async (request, response) => {

    try {

        const { user } = request.body;
        const { password } = user
        delete user.password;

        const userInDB = await userModel.findOne({ user });
        const userInDBSecured = await userModel.findOne({ user }).select('-password -refreshToken');

        if (password == userInDB.password) {    // NOT HASHED FOR DEV PURPOSES //

            const accessToken = generateAccessToken(userInDB);
            const { refreshToken } = userInDB

            response.status(201).cookie('refreshToken', refreshToken, { httpOnly: true }).json({ user: userInDBSecured, accessToken });

        } else Error(response, 'invalidPassword');

    } catch (error) {
        serverError(response, error);
    }

}

export const registerUser = async (request, response) => {
    
    try {
        
        const { user } = request.body;

        const [ dummyUserInDB ] = await userModel.find(user);

        if (dummyUserInDB) Error(response, 'userExists');
        else {
            
            const userInDB = new userModel(user);

            const accessToken = generateAccessToken(userInDB);
            const refreshToken = generateRefreshToken(userInDB);

            userInDB.refreshToken = refreshToken;

            const userInDBSecured = await userModel.findOne(userInDB).select('-password -refreshToken');

            response.status(201).json({ user: userInDBSecured, accessToken });

        }

    } catch (error) {
        serverError(response, error);
    }
}

export const refreshAccess = async (request, response) => {

    try {

        const { userId } = request;
        if (!userId) Error(response, 'userIdMissing');

        const userInDBSecured = await userModel.findById(userId).select('-password');
        const accessToken = generateAccessToken(userInDBSecured);

        response.status(200).json({ accessToken });

    } catch (error) {
        serverError(response, error);
    }

}

export const updateUser = async (request, response) => {

    try {
        
        const { userId } = request;
        if (!userId) Error(response, 'userIdMissing');

        const userUpdated = request.body.user;
        
        await userModel.findByIdAndUpdate(userId, { ...userUpdated, updatedAt: new Date() });

        response.status(200).json({ user: userUpdated });

    } catch (error) {
        serverError(response, error);
    }

}

export const deleteUser = async (request, response) => {

    try {
        
        const { userId } = request;
        if (!userId) Error(response, 'userIdMissing');
        
        await userModel.findOneAndDelete({ id: userId });

        response.status(200).json({ userId });

    } catch (error) {
        serverError(response, error);
    }

}