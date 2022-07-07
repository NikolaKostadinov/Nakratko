import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store.js';

import App from './App.jsx';
import './styles.scss';

const main = document.getElementById('root');
const root = createRoot(main);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

root.render(app);