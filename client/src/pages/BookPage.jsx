import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getBook } from '../actions/book.actions';

import BookPreview from '../components/BookPreview/BookPreview';

export default function Books () {
    
    const dispatch = useDispatch();
    const { booktitle } = useParams();

    useEffect(() => {
        dispatch(getBook({ title: booktitle }))
    }, [dispatch, booktitle]);

    return(
        <>
            <BookPreview />
        </>
    );
}