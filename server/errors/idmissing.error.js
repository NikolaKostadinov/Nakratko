export default function (response) {

    return response.status(400).json({ error: 'Id not provided.' });

}