import Stripe from 'stripe';
import dotenv from 'dotenv';

import userModel from '../models/user.model.js';

import { isSubscribed } from '../modules/payment.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

dotenv.config();
const { STRIPE_SECRET, SUBSCRIPTION_PLAN } = process.env;

const STRIPE = new Stripe(STRIPE_SECRET);

export const createSubscription = async (request, response) => {

    try {
        
        const { userId } = request;
        const { paymentMethod } = request.body;

        const userInDBSecured = await userModel.findById(userId).select('-password');
        const { firstName, lastName, email } = userInDBSecured;

        if (isSubscribed(userInDBSecured.subscriptionId)) response.status(200).json({ status: 'Already subscribed.' });
        else {

            const customer = await STRIPE.customers.create({
                payment_method: paymentMethod,
                name: `${firstName} ${lastName}`,
                email,
                invoice_settings: {
                    default_payment_method: paymentMethod,
                }
            });
            
            const subscription = await STRIPE.subscriptions.create({
                customer: customerId,
                items: [{ plan: SUBSCRIPTION_PLAN }],
                expand: ['latest_invoice.payment_intent']
            });
            
            const customerId = customer.id;
            const subscriptionId = subscription.id;
            
            await userModel.findOneAndUpdate(userInDBSecured, { customerId, subscriptionId });
    
            const clientSecret = subscription.latest_invoice.payment_intent.client_secret;
            const { status } = subscription.latest_invoice.payment_intent;
    
            response.status(201).json({ clientSecret, status });

        }

    } catch (error) {
        serverError(response, error);
    }

}

export const deleteSubscription = async (request, response) => {

    try {
        
        const { userId } = request;
        const userInDBSecured = await userModel.findById(userId).select('-password');
        const { subscriptionId } = userInDBSecured;

        await STRIPE.subscriptions.del(subscriptionId);

        response.status(200).json({ userId });

    } catch (error) {
        serverError(response, error);
    }

}