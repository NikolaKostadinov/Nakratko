import fs from 'fs';

export default (response, type) => {

    const errorsPath = './errors/errors.json';

    const rawErrors = fs.readFileSync(errorsPath);
    const serverErrors = JSON.parse(rawErrors);

    const { status, json } = serverErrors[type];

    return response.status(status).json({...json, type });

}