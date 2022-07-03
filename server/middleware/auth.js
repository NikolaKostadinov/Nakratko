import userModel from '../models/user.model.js';
import { getBearerToken } from '../modules/bearertoken.js';
import { decodeAccessToken } from '../modules/accesstoken.js';
import { isAdmin, isWriter } from '../modules/roles.js';

import serverError from '../errors/server.error.js';
import bearerError from '../errors/bearer.error.js';
import unauthenticatedError from '../errors/unauthenticated.error.js';
import rolekeymissingError from '../errors/rolekeymissing.error.js';
import adminkeyinvalidError from '../errors/adminkeyinvalid.error.js';
import writerkeyinvalidError from '../errors/writerkeyinvalid.error.js';

export const authenticateUser = (request, response, next) => {

    try {
        
        const accessToken = getBearerToken(request);

        if (!accessToken) bearerError(response);
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) unauthenticatedError(response);
            else {
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

        if (!accessToken) bearerError(response);
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) unauthenticatedError(response);
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

        if (!accessToken) bearerError(response);
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) unauthenticatedError(response);
            else {

                const id = decodedAccessToken.userId;
                const userInDBSecured = await userModel.findById(id).select('-password');
                const { roleKey } = userInDBSecured;

                if (!roleKey) rolekeymissingError(response);
                else {

                    if (isAdmin(roleKey)) next();
                    else adminkeyinvalidError(response);
                    
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

        if (!accessToken) bearerError(response);
        else {

            const decodedAccessToken = decodeAccessToken(accessToken);

            if (!decodedAccessToken) unauthenticatedError(response);
            else {

                const id = decodedAccessToken.userId;
                const userInDBSecured = await userModel.findById(id).select('-password');
                const { roleKey } = userInDBSecured;

                if (!roleKey) rolekeymissingError(response);
                else {

                    if (isWriter(roleKey) || isAdmin(roleKey)) next();
                    else writerkeyinvalidError(response);
                    
                }
            }

        }

    } catch (error) {
        serverError(response, error);
    }

}