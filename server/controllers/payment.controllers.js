import Stripe from 'stripe';
import dotenv from 'dotenv';

import serverError from '../errors/500.js';

dotenv.config();
const { STRIPE_SECRET } = process.env;

const STRIPE = new Stripe(STRIPE_SECRET);

export const createSubscription = (request, response) => {

    try {
        
        const { userId } = request;

    } catch (error) {
        serverError(response, error);
    }

}