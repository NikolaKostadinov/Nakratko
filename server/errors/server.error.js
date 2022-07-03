export default function (response, error) {

    return response.status(500).json({ error: error.message });

}