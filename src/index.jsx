import { createRoot } from 'react-dom/client';
import './index.scss'
import App from './components/App';

document.body.innerHTML = '<div id="root"></div>';

const root = createRoot(document.getElementById('root'));
root.render(<App />);