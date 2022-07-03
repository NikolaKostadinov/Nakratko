export default function (response) {

    return response.status(400).json({ error: 'Improper client request. Request must have authorization header starting with \'Bearer\' followed by bearer token.' });

}