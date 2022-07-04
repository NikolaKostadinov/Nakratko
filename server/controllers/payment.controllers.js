import Stripe from 'stripe';
import dotenv from 'dotenv';

import userModel from '../models/user.model.js';

import { generateValidSubscriptionToken, isSubscribed } from '../modules/subscriptiontoken.js';

import serverError from '../errors/500.js';

dotenv.config();
const { STRIPE_SECRET } = process.env;

const STRIPE = new Stripe(STRIPE_SECRET);

export const createSubscription = async (request, response) => {

    try {
        
        const { userId } = request;
        const userInDBSecured = await userModel.findById(userId).select('-password');

        if (isSubscribed(userInDBSecured.subscriptionToken)) response.status(200).json({ message: 'Already subscribed.' });
        else {

            const subscriptionToken = generateValidSubscriptionToken(userInDBSecured);

            await userModel.findByIdAndUpdate(userId, { subscriptionToken });

            response.status(201).json({ subscriptionToken });

        }

    } catch (error) {
        serverError(response, error);
    }

}