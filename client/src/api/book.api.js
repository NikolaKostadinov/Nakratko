import axios from "./axios";

import authConfog from './auth';

import store from '../store';

const PATH = '/books';

const accessToken = store.getState().user.accessToken;

export const getBooks = () => axios.get(PATH, authConfog(accessToken));

export const getBook = (book) => axios.post(PATH, { book }, authConfog(accessToken));