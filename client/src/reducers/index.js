import { combineReducers } from 'redux';

import bookReducer from './book.reducer.js';
import userReducer from './user.reducer.js';

export default combineReducers({
    books: bookReducer,
    user: userReducer
});