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
        const userInDBSecured = await userModel.findOne({ user }).select('-password');

        if (password == userInDB.password) {    // NOT HASHED FOR DEV PURPOSES //

            const accessToken = generateAccessToken(userInDB);

            response.status(201).json({ user: userInDBSecured, accessToken });

        } else Error(response, 'invalidPassword');

    } catch (error) {
        serverError(response, error);
    }

}

export const registerUser = async (request, response) => {
    
    try {
        
        const { user } = request.body;

        const dummyUserInDB = await userModel.find(user);

        if (dummyUserInDB) Error(response, 'userExists');
        else {
            
            const userInDB = new userModel(user);

            const accessToken = generateAccessToken(userInDB);
            const refreshToken = generateRefreshToken(userInDB);

            userInDB.refreshToken = refreshToken;
            await userInDB.save();

            delete userInDB.password;
    
            response.status(201).json({ user: userInDB, accessToken });

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