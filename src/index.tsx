import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Routes, Route, BrowserRouter, Link} from 'react-router-dom'
import routes from './routes/routes'

import Home from './views/pages/Home'
import About from './views/pages/About'
import Calculator from './views/pages/Calculator'

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>
              <Link to={routes.about}>About</Link>
            </li>
            <li>
              <Link to={routes.calculator}>Calculator</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.calculator} element={<Calculator />} />
      </Routes>

      <footer>
        <p>Footer goes here</p>
      </footer>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
