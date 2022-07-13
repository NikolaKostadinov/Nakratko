import React from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

export default function BookPreview () { 

    const [book] = useSelector(state => state.books)

    return(
        <>
            <h1>{book.title}</h1>
        </>
    );
}