import * as api from '../api/book.api.js';

export const getBooks = () => async (dispatch) => {

    try {

        const response = await api.getBooks().then(response => response.data)
        const { books } = response; 

        const action = {
            type: 'GET',
            payload: books
        };
        dispatch(action);
    } catch (error) {
        console.error(error.message);
    }

}