import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../actions/user.actions';

export default function LoginPage () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser());
        navigate(-1);
    }, [dispatch, navigate]);

    return(
        <>
            
        </>
    );
}