import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The official Inter build: it carries the optical-size axis (display cut) and the
// alternate letterforms the design uses, which the Google Fonts build strips out.
import 'inter-ui/inter-variable.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
