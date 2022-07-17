import React from 'react';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../actions/user.actions';

import './styles.scss';

export default function LoginForm () {

    const dispatch = useDispatch()

    function handleSubmit (event) {

        event.preventDefault()

        const email = event.target.email.value;
        const password = event.target.password.value;

        const user = { email, password };

        dispatch(loginUser(user))

    }

    

    return(
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' />
            <input type='password' name='password' />
            <button type='submit'>Log in</button>
        </form>
    );
}