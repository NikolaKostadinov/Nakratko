import notFoundError from '../errors/404.js';

export const serverCheck = (request, response) => {

    response.status(200).json({ server: 'All right' });

}

export const nonExisting = (request, response) => {

    notFoundError(response);

}