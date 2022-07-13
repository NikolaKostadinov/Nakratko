import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getBooks } from '../actions/book.actions';

import BookDeck from '../components/BookDeck/BookDeck';

export default function BooksPage () {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return(
        <>
            <h1>Books</h1>
            <BookDeck />
        </>
    );
}