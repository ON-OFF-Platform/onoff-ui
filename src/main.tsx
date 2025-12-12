import App from './App';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import '@/styles/main.scss';
import '@/styles/color.scss';

createRoot(document.getElementById('root')!).render(
  <Router>
    <App/>
  </Router>
)