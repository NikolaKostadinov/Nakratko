import * as api from '../api/user.api.js';

export const registerUser = (inputUser) => async (dispatch) => {

    try {

        const response = await api.registerUser(inputUser).then(response => response.data);
        const { user, accessToken } = response;

        const action = {
            type: 'IN',
            payload: { ...user, accessToken }
        };
        dispatch(action);
    } catch (error) {
        console.error(error.message);
    }

}

export const loginUser = (inputUser) => async (dispatch) => {

    try {

        const response = await api.loginUser(inputUser).then(response => response.data);
        const { user, accessToken } = response;

        const action = {
            type: 'IN',
            payload: { ...user, accessToken }
        };
        dispatch(action);
    } catch (error) {
        console.error(error.message);
    }

}

export const refreshUserAccess = (inputUser) => async (dispatch) => {

    try {

        const response = await api.refreshUserAccess().then(response => response.data);
        const { accessToken } = response;

        const action = {
            type: 'REFRESH',
            payload: accessToken
        };
        dispatch(action);
    } catch (error) {
        console.error(error.message);
    }

}

export const logoutUser = () => async (dispatch) => {

    try {

        const action = {
            type: 'OUT',
        };
        dispatch(action);
    } catch (error) {
        console.error(error.message);
    }

}