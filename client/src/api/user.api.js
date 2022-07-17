import axios from "./axios";

const PATH = '/user';

export const loginUser = (user) => axios.post(PATH + '/login', { user });

export const refreshUserAccess = () => axios.get(PATH + '/refresh');