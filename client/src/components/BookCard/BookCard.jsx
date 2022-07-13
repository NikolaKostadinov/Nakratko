import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

export default function BookCard (props) {

    const navigate = useNavigate();
    const { book } = props;

    function handleClick () {

        const url = `/book/${book.title}`;
        navigate(url);

    }

    return(
        <div className='card' id={book._id} onClick={handleClick}>
            <h1>{book.title}</h1>
            <img src={book.cover} alt={book.title} style={{ width: 100 }} />
            <h2>By: {book.author}</h2>
        </div>
    );
}