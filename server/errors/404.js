export default function (response) {

    return response.status(404).json({ error: 'Path does not exist' });

}