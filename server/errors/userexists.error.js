export default function (response) {

    return response.status(409).json({ error: 'User already exists' });

}