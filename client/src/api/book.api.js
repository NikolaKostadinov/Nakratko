import axios from "./axios";

const PATH = '/books';

export const getBooks = () => axios.get(PATH);

export const getBook = (book) => axios.post(PATH, { book });