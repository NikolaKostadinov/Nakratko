import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles.scss';

const main = document.getElementById('root');
const root = createRoot(main);

const app = (
    <App />
);

root.render(app);