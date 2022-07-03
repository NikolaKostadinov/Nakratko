import nonexistingError from '../errors/nonexisting.error.js';

export const serverCheck = (request, response) => {

    response.status(200).json({ server: 'All right' });

}

export const nonExisting = (request, response) => {

    nonexistingError(response);

}