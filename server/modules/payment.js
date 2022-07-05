import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const { STRIPE_SECRET } = process.env;

const STRIPE = new Stripe(STRIPE_SECRET);

export const isSubscribed = async (subscriptionId) => {

        const subscription = await STRIPE.subscriptions.retrieve(subscriptionId)
        if (subscription.status === 'active') return true;
        else return false;
}