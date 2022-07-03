export default function (response) {

    return response.status(403).json({ error: 'Role key invalid. Valid admin key required.' });

}