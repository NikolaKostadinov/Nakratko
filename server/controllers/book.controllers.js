import bookModel from '../models/book.model.js';

export const getAllBooks = async (request, response) => {

    try {
        
        const books = await bookModel.find({ });
    
        response.status(200).json({ books });

    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const postBook = async (request, response) => {

    try {
        
        const { book } = request.body;

        const bookInDB = new bookModel(book);
        
        await bookInDB.save();
    
        response.status(201).json({ message: 'SUCCESS' });

    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}