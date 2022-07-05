import userModel from '../models/user.model.js';

import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';
import { isAdmin, isWriter } from '../modules/roles.js';
import { isSubscribed } from '../modules/payment.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

export const authenticateSubscribedUser = async (request, response, next) => {

    try {
        
        const accessToken = getBearerToken(request);

        if (!accessToken) Error(response, 'bearer');
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) Error(response, 'unauthenticated');
            else {

                const { userId } = decodedAccessToken;
                const { userInDBSecured } = await userModel.findById(userId).select('-password');
                const { subscriptionId } = userInDBSecured;

                if (isSubscribed(subscriptionId)) {

                    request.userId = userId;
                    next();

                } else Error(response, 'notSubscribed');
                
            }

        }

    } catch (error) {
        serverError(response, error);
    }

}