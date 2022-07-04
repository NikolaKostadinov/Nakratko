import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';
import { decodeRefreshToken } from '../modules/refreshtoken.js';

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

export const authenticateUserRefresh = (request, response, next) => {

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