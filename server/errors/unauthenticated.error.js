export default function (response) {

    return response.status(401).json({ error: 'Access token is invalid.' });

}