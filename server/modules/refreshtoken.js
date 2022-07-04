import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { REFRESH_TOKEN_SECRET } = process.env;

export const decodeRefreshToken = (refreshToken) => {

    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decodedRefreshToken) => {
        if (error) return false;
        else {
            
            const result = {
                status: 'authenticated',
                userId: decodedRefreshToken.userId
            }

            return result;

        }
    });

}

export const generateRefreshToken = (user) => {

    const payload = {
        userId: user._id
    };

    const accessToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);
    return accessToken;

}