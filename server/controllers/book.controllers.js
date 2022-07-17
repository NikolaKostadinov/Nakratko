import bookModel from '../models/book.model.js';
import userModel from '../models/user.model.js';

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

export const getCoverBook = async (request, response) => {

    try {
        
        const { book } = request.body;

        const [bookInDBCover] = await bookModel.find(book); // THIS SHOULD BE FILTERED
    
        response.status(200).json({ book: bookInDBCover });

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

export const addToFavorites = async (request, response) => {

    try {

        const { userId } = request;
        const { bookId } = request.params;

        const { favoriteBooks } = await userModel.findById(userId);

        if (favoriteBooks.includes(bookId)) response.status(202).json({ book: bookId });
        else {

            await userModel.findByIdAndUpdate(userId, { favoriteBooks: [ ...favoriteBooks, bookId ] });
    
            response.status(200).json({ book: bookId });

        }
        
    } catch (error) {
        serverError(response, error);
    }

}

export const removeFromFavorites = async (request, response) => {

    try {

        const { userId } = request;
        const { bookId } = request.params;

        const { favoriteBooks } = await userModel.findById(userId);

        const bookIdIndex = favoriteBooks.indexOf(bookId);
        if (bookIdIndex > -1) favoriteBooks.splice(bookIdIndex, 1);

        await userModel.findByIdAndUpdate(userId, { favoriteBooks });
    
        response.status(200).json({ book: bookId });
        
    } catch (error) {
        serverError(response, error);
    }

}

export const postBook = async (request, response) => {

    try {
        
        const { writerId } = request;
        const { book } = request.body;

        const bookInDB = new bookModel({...book, createdBy: writerId });
        await bookInDB.save();
    
        response.status(201).json({ book: bookInDB });

    } catch (error) {
        serverError(response, error);
    }
}

export const updateBook = async (request, response) => {

    try {
        const { writerId, isAdmin } = request;
        const { bookId } = request.params;
        const { book } = request.body;

        const bookInDB = await bookModel.findById(bookId);

        if (writerId !== bookInDB.createdBy || !isAdmin) Error(response, 'notYourBook');
        else {
            
            await bookModel.findByIdAndUpdate(book.id, { ...book, updatedAt: new Date() });
        
            response.status(201).json({ book: bookInDB });

        }

    } catch (error) {
        serverError(response, error);
    }
}

export const deleteBook = async (request, response) => {

    try {
        
        const { writerId } = request;
        const { bookId } = request.params;

        const bookInDB = await bookModel.findById(bookId);

        if (writerId !== bookInDB.createdBy) Error(response, 'notYourBook');
        else {
            
            await bookModel.findByIdAndDelete(book.id);
        
            response.status(200).json({ book: bookInDB });

        }

    } catch (error) {
        serverError(response, error);
    }
}