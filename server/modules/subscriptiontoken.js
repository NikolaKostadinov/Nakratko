import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SUBSCRIPTION_TOKEN_SECRET } = process.env;

const BLOCKLIST_PATH = './json/subscriptionBlockList.json';

export const generateValidSubscriptionToken = (user) => {

    const payload = {
        userId: user._id
    };

    const subscriptionToken = jwt.sign(payload, SUBSCRIPTION_TOKEN_SECRET);
    return subscriptionToken;

}

export const generateInvalidSubscriptionToken = () => {

    return 'some.random.string.like.jwt';

}

export const blockSubscriptionToken = (subscriptionToken) => {

    const rawBlockList = fs.readFileSync(BLOCKLIST_PATH);
    const blockList = JSON.parse(rawBlockList);

    const newBlockList = [...blockList, subscriptionToken];
    const newRawBlockList = JSON.stringify(newBlockList);

    fs.writeFileSync(BLOCKLIST_PATH, newRawBlockList);
}

export const isSubscribed = (subscriptionToken) => {

    return jwt.verify(subscriptionToken, SUBSCRIPTION_TOKEN_SECRET, (error, decodedSubscriptionToken) => {
        if (error) return false;
        else {

            const rawBlockList = fs.readFileSync(BLOCKLIST_PATH);
            const blockList = JSON.parse(rawBlockList);

            if (blockList.includes(subscriptionToken)) return false;
            else return true;

        }
    });

}