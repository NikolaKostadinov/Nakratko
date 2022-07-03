export default function (response) {

    return response.status(403).json({ error: 'Role key not provided.' });

}