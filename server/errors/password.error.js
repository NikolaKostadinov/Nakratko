export default function (response) {

    return response.send(401).json({ error: 'Wrong password' })

}