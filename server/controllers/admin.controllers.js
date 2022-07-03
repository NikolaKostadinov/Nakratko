import dotenv from 'dotenv';

import userModel from '../models/user.model.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

dotenv.config();
const { ADMIN_KEY, WRITER_KEY } = process.env;

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
        
        const { id } = request.query;

        if (!id) Error(response, 'userIdMissing');
        else {

            await userModel.findByIdAndUpdate(id, { roleKey: null });
            response.status(200).json({ id });
        }

    } catch (error) {
        serverError(response, error);
    }

}