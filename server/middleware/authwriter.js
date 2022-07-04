import userModel from '../models/user.model.js';

import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';
import { isAdmin, isWriter } from '../modules/roles.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

export const authenticateWriter = async (request, response, next) => {

    try {
        
        const accessToken = getBearerToken(request);

        if (!accessToken) Error(response, 'bearer');
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) unauthenticatedError(response);
            else {

                const id = decodedAccessToken.userId;
                const userInDBSecured = await userModel.findById(id).select('-password');
                const { roleKey } = userInDBSecured;

                if (!roleKey) Error(response, 'roleKeyMissing');
                else {

                    if (isWriter(roleKey) || isAdmin(roleKey)) next();
                    else Error(response, 'writerKeyInvalid');
                    
                }
            }

        }

    } catch (error) {
        serverError(response, error);
    }

}