import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';
import { isAdmin, isWriter } from '../modules/roles.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

export const authenticateSubscribedUser = async (request, response, next) => {

    try {
        
        const subscriptionToken = getBearerToken(request);

        if (!subscriptionToken) Error(response, 'bearer');
        else {

            const decodedSubscriptionToken = decodeAccessToken(subscriptionToken);

            if (!decodedSubscriptionToken) Error(response, 'unauthenticated');
            else {

                const id = decodedSubscriptionToken.userId;
                const userInDBSecured = await userModel.findById(id).select('-password');
                const { roleKey, subscriptionToken } = userInDBSecured;

                if (isAdmin(roleKey) || isWriter(roleKey) || isSubscribed(subscriptionToken)) next();
                else Error(response, 'notSubscribed');

            }

        }

    } catch (error) {
        serverError(response, error);
    }

}