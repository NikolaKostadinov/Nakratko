import { baseAxios, privateAxios } from "./axios";

const PATH = '/user';

export const loginUser = (user) => baseAxios.post(PATH + '/login', { user });

export const refreshUserAccess = () => privateAxios.get(PATH + '/refresh');