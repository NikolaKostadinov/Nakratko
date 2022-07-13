import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;
const BOOKS_URL = `${URL}/books`;

export const getBooks = () => axios.get(BOOKS_URL);

export const getBook = (book) => axios.get();