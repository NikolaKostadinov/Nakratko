export default function (response) {

    return response.status(400).json({ error: 'Invalid role.' })

}