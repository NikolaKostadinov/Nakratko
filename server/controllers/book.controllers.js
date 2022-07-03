import bookModel from '../models/book.model.js';

import Error from '../errors/error.js';
import serverError from '../errors/500.js';

export const getCoverBooks = async (request, response) => {

    try {
        
        const { index, count } = request.query;

        if (!index && !count) {

            const books = await bookModel.find({ });
    
            response.status(200).json({ books });

        } else if (index && count) {

            const numberOfBooks = await bookModel.countDocuments({ });

            if (count > 0 && count < numberOfBooks && index >= 0) {

                const deltaIndex = Math.floor(numberOfBooks / count);
                const firstIndex = deltaIndex * index;
                const lastIndex = firstIndex + deltaIndex;

                const books = await (await bookModel.find({ })).splice(firstIndex, lastIndex);

                response.status(200).json({ books });

            } else Error(response, 'invalidQuery');

        } else Error(response, 'missingFields');

    } catch (error) {
        serverError(response, error);
    }
}

export const getFullBook = async (request, response) => {

    try {

        const { bookId } = request.params;

        response.status(200).json({ book: bookId });
        
    } catch (error) {
        serverError(response, error);
    }

}

export const postBook = async (request, response) => {

    try {
        
        const { book } = request.body;

        const bookInDB = new bookModel(book);
        await bookInDB.save();
    
        response.status(201).json({ book: bookInDB });

    } catch (error) {
        serverError(response, error);
    }
}