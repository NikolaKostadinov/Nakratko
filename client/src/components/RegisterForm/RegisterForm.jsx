import React from 'react';
import { useDispatch } from 'react-redux';

import { registerUser } from '../../actions/user.actions';

import './styles.scss';

export default function RegisterForm () {

    const dispatch = useDispatch()

    function handleSubmit (event) {

        event.preventDefault()

        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const user = { firstName, lastName, email, password };

        dispatch(registerUser(user));

    }

    return(
        <form onSubmit={handleSubmit}>
            <input type='text' name='firstName' />
            <input type='text' name='lastName' />
            <input type='email' name='email' />
            <input type='password' name='password' />
            <button type='submit'>Sign in</button>
        </form>
    );
}