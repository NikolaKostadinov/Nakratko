import dotenv from 'dotenv';

import userModel from '../models/user.model.js';

import serverError from '../errors/server.error.js';
import idmissingError from '../errors/idmissing.error.js';
import rolemissingError from '../errors/rolemissing.error.js';
import roleinvalidError from '../errors/roleinvalid.error.js';

dotenv.config();
const { ADMIN_KEY, WRITER_KEY } = process.env;

export const setRole = async (request, response) => {

    try {
        
        const { id, role } = request.query;

        if (!id) idmissingError(response);
        else if (!role) rolemissingError(response);
        else {

            if (role === 'admin') {

                await userModel.findByIdAndUpdate(id, { roleKey: ADMIN_KEY });
                response.status(200).json({ id, role });
            }
            else if (role === 'writer') {

                await userModel.findByIdAndUpdate(id, { roleKey: WRITER_KEY });
                response.status(200).json({ id, role });
            }
            else roleinvalidError(response);
        }

    } catch (error) {
        serverError(response, error);
    }

}

export const removeRole = async (request, response) => {

    try {
        
        const { id } = request.query;

        if (!id) idmissingError(response);
        else {

            await userModel.findByIdAndUpdate(id, { roleKey: null });
            response.status(200).json({ id });
        }

    } catch (error) {
        serverError(response, error);
    }

}