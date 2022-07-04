import userModel from '../models/user.model.js';
import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';
import { decodeRefreshToken } from '../modules/refreshtoken.js';
import { isAdmin, isWriter } from '../modules/roles.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

export const authenticateUser = (request, response, next) => {

    try {
        
        const accessToken = getBearerToken(request);

        if (!accessToken) Error(response, 'bearer');
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) Error(response, 'unauthenticated');
            else {
                next();
            }

        }

    } catch (error) {
        serverError(response, error);
    }

}

export const authenticateRefresh = (request, response, next) => {

    try {
        
        const refreshToken = getBearerToken(request);

        if (!refreshToken) Error(response, 'bearer');
        else {

            const decodedRefreshToken = decodeRefreshToken(refreshToken);

            if (!decodedRefreshToken) Error(response, 'unauthenticated');
            else {
                request.userId = decodedRefreshToken.userId;
                next();
            }

        }

    } catch (error) {
        serverError(response, error);
    }

}

export const authenticateSubscribedUser = (request, response, next) => {

    try {
        
        const accessToken = getBearerToken(request);

        if (!accessToken) Error(response, 'bearer');
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) Error(response, 'unauthenticated');
            else {

                // some logic

                next();
            }

        }

    } catch (error) {
        serverError(response, error);
    }

}

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