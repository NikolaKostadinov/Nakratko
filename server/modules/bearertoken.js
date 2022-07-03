export const getBearerToken = (request) => {

    const { authorization } = request.headers;

    if (!authorization) return false;
    else {

        const splitedAuthorization = authorization.split(' ');

        if (splitedAuthorization.length !== 2) return false;
        else {
    
            if (splitedAuthorization[0] !== 'Bearer') return false;
            else {
                const bearerToken = splitedAuthorization[1];    
                return bearerToken;
            }
        }
    }
}