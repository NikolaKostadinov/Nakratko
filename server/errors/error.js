import fs from 'fs';

export default (response, type) => {

    const errorsPath = './json/errors.json';

    const rawErrors = fs.readFileSync(errorsPath);
    const serverErrors = JSON.parse(rawErrors);

    if (!serverErrors[type]) return response.status(500).json({ error: `Error type \'${type}\' not defined. Define it in ${errorsPath}` });
    else {

        const { status, json } = serverErrors[type];

        return response.status(status).json({...json, type });

    }

}