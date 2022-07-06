import dotenv from 'dotenv';

import userModel from '../models/user.model.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

dotenv.config();
const { ADMIN_KEY, WRITER_KEY } = process.env;

export const getUser = async (request, response) => {

    try {
        
        const user = request.query;

        const userInDBSecured = await userModel.findOne(user).select('-password');

        response.status(200).json({ user: userInDBSecured });

    } catch (error) {
        serverError(response, error);
    }

}

export const updateUser = async (request, response) => {

    try {
        
        const user = request.query;
        const userUpdate = request.body.user;

        await userModel.findOneAndUpdate(user, userUpdate);

        response.status(200).json({ userUpdate });

    } catch (error) {
        serverError(response, error);
    }

}

export const deleteUser = async (request, response) => {

    try {
        
        const user = request.query;

        await userModel.findOneAndDelete(user);

        response.status(200).json({ user });

    } catch (error) {
        serverError(response, error);
    }

}

export const setRole = async (request, response) => {

    try {
        
        const { id, role } = request.query;

        if (!id) Error(response, 'userIdMissing');
        else if (!role) Error(response, 'roleMissing');
        else {

            if (role === 'admin') {

                await userModel.findByIdAndUpdate(id, { roleKey: ADMIN_KEY });
                response.status(200).json({ id, role });
            }
            else if (role === 'writer') {

                await userModel.findByIdAndUpdate(id, { roleKey: WRITER_KEY });
                response.status(200).json({ id, role });
            }
            else Error(response, 'invalidRole');
        }

    } catch (error) {
        serverError(response, error);
    }

}

export const removeRole = async (request, response) => {

    try {
        
        const { userId } = request.query;

        if (!userId) Error(response, 'userIdMissing');
        else {

            await userModel.findByIdAndUpdate(userId, { roleKey: null });
            response.status(200).json({ userId });
        }

    } catch (error) {
        serverError(response, error);
    }

}