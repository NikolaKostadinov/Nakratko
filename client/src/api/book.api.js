import { baseAxios } from "./axios";

const PATH = '/books';

export const getBooks = () => baseAxios.get(PATH);

export const getBook = (book) => baseAxios.post(PATH, { book });