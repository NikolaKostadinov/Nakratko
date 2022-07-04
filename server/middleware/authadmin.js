import userModel from '../models/user.model.js';

import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';
import { isAdmin } from '../modules/roles.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

export const authenticateAdmin = async (request, response, next) => {

    try {
        
        const accessToken = getBearerToken(request);

        if (!accessToken) Error(response, 'bearer');
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) Error(response, 'unauthenticated');
            else {

                const id = decodedAccessToken.userId;
                const userInDBSecured = await userModel.findById(id).select('-password');
                const { roleKey } = userInDBSecured;

                if (!roleKey) Error(response, 'roleKeyMissing');
                else {

                    if (isAdmin(roleKey)) next();
                    else Error(response, 'invalidAdminKey');
                    
                }
            }

        }

    } catch (error) {
        serverError(response, error);
    }

}

