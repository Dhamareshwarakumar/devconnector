import ReactDOM from 'react-dom/client';
import App from './App';
import axios from './config/axios';

// Config
axios.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);