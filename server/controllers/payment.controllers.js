import Stripe from 'stripe';
import dotenv from 'dotenv';

import userModel from '../models/user.model.js';

import { generateValidSubscriptionToken, isSubscribed } from '../modules/subscriptiontoken.js';

import serverError from '../errors/500.js';

dotenv.config();
const { STRIPE_SECRET, SUBSCRIPTION_PLAN } = process.env;

const STRIPE = new Stripe(STRIPE_SECRET);

export const createSubscription = async (request, response) => {

    try {
        
        const { userId } = request;
        const userInDBSecured = await userModel.findById(userId).select('-password');

        if (isSubscribed(userInDBSecured.subscriptionToken)) response.status(200).json({ message: 'Already subscribed.' });
        else {

            const { firstName, lastName, email } = userInDBSecured;
            const paymentMethod = request.body.payment_method;

            const customer = await STRIPE.customers.create({
                payment_method: paymentMethod,
                name: `${firstName} ${lastName}`,
                email,
                invoice_settings: {
                  default_payment_method: paymentMethod,
                }
            });

            const subscription = await STRIPE.subscriptions.create({
                customer: customer.id,
                items: [{ plan: SUBSCRIPTION_PLAN }],
                expand: ['latest_invoice.payment_intent']
            });
            const clientSecret = subscription.latest_invoice.payment_intent.client_secret;
            const { status } = subscription.latest_invoice.payment_intent;

            const subscriptionToken = generateValidSubscriptionToken(userInDBSecured);
            await userModel.findOneAndUpdate(userInDBSecured, { subscriptionToken });

            response.status(201).json({ clientSecret, status });

        }

    } catch (error) {
        serverError(response, error);
    }

}