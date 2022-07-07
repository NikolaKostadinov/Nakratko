import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

export default configureStore(reducer, compose(applyMiddleware(thunk)));