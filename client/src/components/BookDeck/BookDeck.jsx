import React from 'react';
import { useSelector } from 'react-redux';

import BookCard from '../BookCard/BookCard';

import './styles.scss';

export default function BookDeck () {

    const books = useSelector(state => state.books)
    const bookCards = books.map(book => <BookCard book={book} key={book._id} />)

    return(
        <div>
           {bookCards}
        </div>
    );
}