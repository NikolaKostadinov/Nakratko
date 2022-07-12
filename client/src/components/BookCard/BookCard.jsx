import React from 'react';

import './styles.scss';

export default function BookCard (props) {

    const { book } = props;

    return(
        <>
            <h1>{book.title}</h1>
            <img src={book.cover} alt={book._id} style={{ width: 100 }} />
            <h2>By: {book.author}</h2>
        </>
    );
}