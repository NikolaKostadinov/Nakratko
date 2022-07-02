export const getBooks = (request, response) => {
    response.status(200).json({ books: ['📕', '📗', '📘', '📙'] })
}