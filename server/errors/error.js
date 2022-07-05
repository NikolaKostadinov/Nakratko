import fs from 'fs';

export default (response, type) => {

    const ERRORS_PATH = './errors/errors.json';

    const rawErrors = fs.readFileSync(ERRORS_PATH);
    const serverErrors = JSON.parse(rawErrors);

    if (!serverErrors[type]) return response.status(500).json({ error: `Error type \'${type}\' not defined. Define it in ${ERRORS_PATH}` });
    else {

        const { status, json } = serverErrors[type];

        return response.status(status).json({...json, type });

    }

}