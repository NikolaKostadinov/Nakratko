import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TIME } = process.env;

export const decodeAccessToken = (accessToken) => {

    return jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decodedAccessToken) => {
        if (error) return false;
        else {
            
            const result = {
                status: 'authenticated',
                userId: decodedAccessToken.userId
            }

            return result;

        }
    });

}

export const generateAccessToken = (user) => {

    const payload = {
        userId: user._id,
        userRefreshToken: user.refreshToken,
        userSubscriptionToken: user.subscriptionToken
    };
    const options = {
        expiresIn: REFRESH_TIME
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
    return accessToken;

}