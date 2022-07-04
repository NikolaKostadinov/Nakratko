import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

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